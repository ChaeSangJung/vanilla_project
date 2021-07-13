const body = document.querySelector("body");

const clickBodyEvent = (event) => {
    const target = event.target;

    // pass할 목록들
    // input들
    const inputs = event.currentTarget.querySelectorAll(".js_input");
    for(i=0; i<inputs.length; i++) {
        if( inputs[i] == target ) {
            return
        };
    }
    // span.text 이면 pass
    const textTags = event.currentTarget.querySelectorAll(".text");
    
    for(i=0; i<textTags.length; i++) {
        if( textTags[i] == target ) {
            return
        };
    }
    // 리스트를 찾아 닫읍시다.
    const listTags = Array.from(event.currentTarget.querySelectorAll(".listExample"));

    // 열려있는 리스트 닫기
    listTags.forEach(function(listTag){
        if(listTag.classList.contains('active')) {
            listTag.classList.remove('active');
        }
    });

    // input_value, input_keyword 원위치
    const input_values = Array.from(document.querySelectorAll(".input_value"));
    const input_keywords = Array.from(document.querySelectorAll(".input_keyword"));

    console.log(input_values,input_keywords)
}

body.addEventListener('click', clickBodyEvent);