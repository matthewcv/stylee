/// <reference path="http://code.jquery.com/jquery-2.1.0.js"/>
/// <reference path="http://code.jquery.com/ui/1.9.2/jquery-ui.js"/>

$(function () {

    function radioVal (name) {
        var chkd = $("input[name='" + name + "']:checked");
        if (chkd.length == 1) {
            return chkd.val();
        }

        return null;
    }

    var boxInit =
    {
        border: "solid 1px black",
        position: "absolute",
        top: "100px",
        left: "200px",
        width: "100px",
        height: "100px",
        backgroundColor:"white"
    };


    $b = $('body');

    $selectedBox = null;

    $("#makeBox").click(function (evt) {

        $selectedBox = $('<div class="box">')
            .css(boxInit)
            .appendTo($b)
            .draggable({ containment: $b })
            .resizable({ containment: $b, handles: 'all' })
            .mousedown(boxMouseDown);
        return false;
    });

    $("input[type=range]").on('change', function() {
        setColor();
    });

    function boxMouseDown(ev) {
        $('.box').each(function() {
            $(this).css('z-index', 0);
        });
        $selectedBox = $(this).css('z-index', 1);
    }


    function setColor() {

        var thing = radioVal('colors') || 'border';

        var v = $("input[type=range]").map(function(r) {
            return $(this).val();
        }).get().join();

        if ($selectedBox) {
            $selectedBox.css( thing + "-color", "rgba(" + v + ")");
        }
    }
});
