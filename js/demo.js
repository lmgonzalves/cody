(function(){

    var refreshButton = document.querySelector('.refresh-icon');
    var circlePath = refreshButton.querySelector('.circle-path');
    var arrowPath = refreshButton.querySelector('.arrow-path');
    var arrowSvg = refreshButton.querySelector('.arrow-svg');
    var circleSegment = new Segment(circlePath, '25%', '90%');
    var arrowSegment = new Segment(arrowPath, '25%', '75%');

    var animating = false;
    refreshButton.addEventListener('click', function(){
        if(!animating){
            animating = true;
            triggerAnimation();
        }
    }, false);

    function triggerAnimation(){
        circleSegment.draw('75%', '165%', 0.5, {circular: true, callback: function(){
            circleSegment.draw('10%', '90%', 0.2, {circular: true, callback: function(){
                circleSegment.draw('25%', '90%', 1.5, {circular: true, easing: d3_ease.easeElasticOut.ease, callback: function(){
                }});
            }});
        }});

        arrowSvg.setAttribute('class', 'arrow-svg arrow-animation');

        arrowSegment.draw('50%', '50% + 0.01', 0.8, {callback: function(){
            arrowSegment.draw('25%', '75%', 1.4, {easing: d3_ease.easeElasticOut.ease, callback: function(){
                arrowSvg.setAttribute('class', 'arrow-svg');
                animating = false;
            }});
        }});
    }

})();
