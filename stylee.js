/// <reference path="http://code.jquery.com/jquery-2.1.0.js"/>
/// <reference path="http://code.jquery.com/ui/1.9.2/jquery-ui.js"/>

"use strict";

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
        border: "solid 1px red",
        position: "absolute",
        top: "100px",
        left: "200px",
        width: "100px",
        height: "100px",
        backgroundColor:"white"
    };


    var $b = $('body');

    var $selectedBox = null;
    
    var $colorSliders = $(".colorpicker input[type=range]").on('change', function() {
        setColor();
    });
    
    $("input[name='colors']").on('change', function() {
        getColor();
    });

    $("#makeBox").click(function (evt) {

        selectBox($('<div class="box">')
            .css(boxInit)
            .appendTo($b)
            .draggable({ containment: $b })
            .resizable({ containment: $b, handles: 'all' })
            .mousedown(function(){
                selectBox(this);
            })[0]);
        return false;
    });
    
    $(".borders input").on('change', function(){
        setBorder.apply(this);
    });
    
    function setBorder(){
        if($selectedBox){
            var style = $(this).data('style');
            var unit = $(this).data('unit');
            $selectedBox.css(style, $(this).val() + unit);
            
        }
    }

    
    function selectBox(box) {
        console.dir(box.style);
        $('.box').each(function() {
            $(this).css('z-index', 0);
        });
        $selectedBox = $(box).css('z-index', 1);
        getColor();
    }
    
    function getColor(){
        if($selectedBox){
            var thing = radioVal('colors') || 'border';
            var color = new $.Color($selectedBox[0].style[thing + 'Color'])
            $colorSliders.each(function(i){
                $(this).val(color._rgba[i]);
            })
        }
        
    }


    function setColor() {

        var thing = radioVal('colors') || 'border';

        var v = $colorSliders.map(function(r) {
            return $(this).val();
        }).get().join();

        if ($selectedBox) {
            $selectedBox.css( thing + "-color", "rgba(" + v + ")");
        }
    }
});
