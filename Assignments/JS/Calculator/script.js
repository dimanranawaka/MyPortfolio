$(document).ready(function() {
    var result = $('#result');

    $('button').on('click', function() {
        var btnVal = $(this).text();
        var currVal = result.val();

        if (btnVal === 'C') {
            result.val('');
        } else if (btnVal === 'CE') {
            result.val(currVal.slice(0, -1));
        } else if (btnVal === '=') {
            try {
                result.val(eval(currVal));
            } catch (error) {
                result.val('Error');
            }
        } else {
            result.val(currVal + btnVal);
        }
    });
});
