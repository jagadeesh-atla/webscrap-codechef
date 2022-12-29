const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const clean = require('./cleaner');
const url = require('url');

function run(handel, res) {
    const base = 'https://www.codechef.com/';
    const link = base + 'users/' + handel;
    const data = {};
    axios(link)
        .then(response => {
            const html = response.data;
            // console.log(html);
            const $ = cheerio.load(html);

            $('.content .user-profile-container', html).each((i, el) => {
                data.error = false;
                data.message = 'The username specified exists in our database.';
                data.platform = 'CodeChef';
                data.name = $(el).find('.h2-style').text();
                data.username = $(el).find('.side-nav .m-username--link').text();
                data.rating = Array.from($('.rating-header div'), (el) => $(el).text());
                data.maxRating = parseInt($(el).find('.rating-header small').text().slice(16, -1), 10);
                data.ranks = Array.from($(el).find('.rating-ranks ul a strong'), (el) => $(el).text());
                data.country = $(el).find('.side-nav .user-country-name').text();
                data.noOfContest = parseInt($(el).find('.rating-title-container .contest-participated-count b').text(), 10);
                data.TotalWork = Array.from($('.rating-data-section .content h5'), (el) => parseInt($(el).text().split('(').pop().split(')')[0], 10));
                // data.contests= Array.from($('.rating-data-section .content p strong'), (el) => $(el).text().slice(0, -1));
                // data.solved= Array.from($('.rating-data-section .content article a'), (el) => $(el).text());
                data.slinks = []; const linkObjects = $('.problems-solved a'); linkObjects.each((index, element) => { data.slinks.push(url.resolve(base, $(element).attr('href'))); });

                // const r = $.html($('#cumulative-graph'));
                // data.r = r;
                // // const s = $(el).find('#submissions-graph').html();
                // // data.s = s;
                // console.log(data);

                if (Object.entries(data).length === 0) { data.error = true; data.message = 'The username specified does not exist in our database.'; res.status(404).json(data); }
                else {
                    data.ranks = clean.ranks(data.ranks);
                    data.rating = clean.rating(data.rating, data.maxRating);
                    data.work = clean.work(data.TotalWork);
                    data.problems = clean.problems(data.slinks, data.TotalWork);

                    delete data.TotalWork;
                    delete data.slinks;
                    delete data.maxRating;

                    res.status(200).json(data);
                }
                // console.log(data);
                // fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => { if (err) throw err; });
            })
        }).catch(err => { console.log(err); data.error = true; data.message = 'The username specified does not exist in our database.'; res.status(400).json(data); });
}

module.exports = { run };