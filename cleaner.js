function problems(links, num) {
    const newLink = [];
    let temp = '';

    for (i = 0, k = 1; i < links.length; i++) {
        const link = links[i];
        if (link.includes('/status')) {
            const str = link.replace('https://www.codechef.com/', '').replace('status/', '-');
            temp = str.substring(0, str.indexOf('/'));
            const contest = (temp == '') ? 'PRACTICE' : temp;
            const code = str.substring(str.indexOf('-') + 1, str.indexOf('?'));
            const type = 'solved';

            newLink.push({ type: type, contest: contest, problem: code });
        }
        else {
            if (link.includes('/problems')) {
                const str = link.replace('https://www.codechef.com/', '').replace('/problems/', '-');
                temp = str.substring(0, str.indexOf('-'));
                const contest = (temp == '' || temp == 'practice') ? 'PRACTICE' : temp;
                temp = str.substring(str.indexOf('-') + 1);
                const code = (contest == 'PRACTICE') ? temp.substring(temp.indexOf('/') + 1) : temp;

                if (k <= num[2]) {
                    const type = 'Problems Authored'; k++;
                    newLink.push({ type: type, contest: contest, problem: code });
                }
                else if (k <= num[2] + num[3]) {
                    const type = 'Problems Tested'; k++;
                    newLink.push({ type: type, contest: contest, problem: code });
                }
                else {
                    const type = 'Editorials Contributed'; k++;
                    newLink.push({ type: type, contest: contest, problem: code });
                }
            }
        }
    }
    return newLink;
}

function rating(array, max) {
    array[0] = parseInt(array[0], 10);
    array[1] = array[1].slice(1, -1);
    array[2] = array[2].length;
    return { rating: array[0], divison: array[1], stars: array[2], maxrating: max };
}
function work(array) {
    return { fully_solved: array[0], partially_solved: array[1], problems_authored: array[2], problems_tested: array[3], editorials_contributed: array[4] }
}
function ranks(array) {
    const newarray = [];
    for (i = 0; i < array.length; i++) {
        if (!isNaN(array[i])) newarray.push(parseInt(array[i]));
    }
    return newarray;
}

module.exports = { problems, rating, work, ranks };
