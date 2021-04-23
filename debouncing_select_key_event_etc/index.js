// input 클릭 enter key

const input = document.querySelector('.input');
const inputs = Array.from(document.querySelectorAll('.input'));
const js_items = Array.from(document.querySelectorAll('.js_item'));
const js_item_multies = Array.from(document.querySelectorAll('.js_item_multi'));
const body = document.querySelector("body");

// 특정 영역 외 클릭 
function clickBodyEvent(event) {
    const target = event.target;    
    // input 이면 pass
    const inputTags = event.currentTarget.querySelectorAll(".input");
    
    for(i=0; i<inputTags.length; i++) {
        if( inputTags[i] == target ) {                
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

    // 기타 클릭 영역들을 위와 같이 작성 할 것!! ex) textarea, button and so on.
    // 리스트를 찾아 닫읍시다.
    const listTags = Array.from(event.currentTarget.querySelectorAll(".listExample"));

    // 열려있는 리스트 닫기
    listTags.forEach(function(listTag){
        if(listTag.classList.contains('active')) {
            listTag.classList.remove('active');
        }
    })
}

body.addEventListener('click', clickBodyEvent);

inputs.forEach(function(input){
    input.addEventListener('click',function(event){
        const ons = Array.from(document.querySelectorAll('.on'));
        const actives = Array.from(document.querySelectorAll('.active'));
        
        for (i=0; i<ons.length;i++){            
            ons[i].classList.remove('on');
        }
        for (i=0; i<actives.length;i++){
            actives[i].classList.remove('active');
        }
        event.currentTarget.classList.add('on');
        event.currentTarget.nextElementSibling.classList.add('active');
    });
    input.addEventListener('focus',function(event){
        event.currentTarget.classList.add('on');
        event.currentTarget.nextElementSibling.classList.add('active');    
    });
});

window.addEventListener('keyup', function(event){
    if(event.keyCode === 40) { // Down Arrow key
        const on = document.querySelector('.on');
        if(on.nextElementSibling.classList.contains('active')){
            const arr_li = Array.from(on.nextElementSibling.querySelectorAll('.focus'));
            if(arr_li.length === 0) {
                on.nextElementSibling.firstElementChild.classList.add('focus');
            } else {
                const forty = on.nextElementSibling.querySelector('.focus');
                if(forty.nextElementSibling) {
                    forty.classList.remove('focus');
                    forty.nextElementSibling.classList.add('focus');
                }
            }
        }
    }
    
    if (event.keyCode === 38){ // Up Arrow key
        const on = document.querySelector('.on');
        if(on.nextElementSibling.classList.contains('active')){
            const forty = on.nextElementSibling.querySelector('.focus');
            if(forty.previousElementSibling) {
                forty.classList.remove('focus');
                forty.previousElementSibling.classList.add('focus');
            }
        }
    }
    if (event.keyCode === 13) { // enter key
        const on = document.querySelector('.on');
        const stad = on.nextElementSibling.querySelector('.js_item.focus');
        // .js_item_multi.focus
        console.log(stad)
        if(on !== null && stad !== null){
            const text = stad.querySelector('.text').innerText;
            on.value = text;
        }
    }
});

js_items.forEach(function(js_item){
    js_item.addEventListener('click', function(event){
        const wrap = event.currentTarget.closest('.wrapItems');
        const items = wrap.querySelectorAll('.focus');
        if(items.length > 0){
            for(i=0; i<items.length; i++){
                items[i].classList.remove('focus');
            }
        }
        js_item.classList.add('focus');
        wrap.querySelector('.input').value = event.currentTarget.querySelector('.text').innerText;
        wrap.querySelector('.listExample').classList.remove('active');
    })
});

function handleInput(wrap){
    const multi_inner = wrap.querySelector('.multi_inner');
    const input = wrap.querySelector('.multi_input');
    const listSelected = wrap.querySelector('.listSelected');

    console.log(multi_inner.clientWidth, input.clientWidth,Math.ceil(listSelected.clientWidth + 0.5));
    input.style.width = multi_inner.clientWidth - Math.ceil(listSelected.clientWidth + 0.5) + 'px';
}

function createList(text, listSelected){    
    const item_selected = document.createElement("div"); 
    const itemText = document.createElement("span");
    const DelBtn = document.createElement("button");

    item_selected.className = 'item_multi_selected';
    itemText.className = 'text';
    DelBtn.className = 'btn_del';

    itemText.innerText = text;
    DelBtn.innerText = 'x';

    item_selected.appendChild(itemText);
    item_selected.appendChild(DelBtn);

    DelBtn.addEventListener("click", (event) => {
        const wrap = event.currentTarget.closest('.wrapItems');
        listSelected.removeChild(item_selected);
        handleInput(wrap);
    });
    return item_selected;
}

js_item_multies.forEach(function(js_item_multi){
    js_item_multi.addEventListener('click',function(event){
        const wrap = event.currentTarget.closest('.wrapItems');
        const listSelected = wrap.querySelector('.listSelected');        
        const target = event.currentTarget;
        const text = target.querySelector('.text').innerText;
        const pendingElement = createList(text, listSelected);
        
        listSelected.appendChild(pendingElement);
        handleInput(wrap);
    })
});

// 여러개 붙이기
// 1. 아래 형식으로 createElement, ul에 appendChild
{/*
<div class="listSelected">
    <div class="item_multi_selected">
        <span class="text">text</span>
        <button class="btn_del">x</button>
    </div>
    <div class="item_multi_selected">
        <span class="text">text</span>
        <button class="btn_del">x</button>
    </div>
</div>
*/}
// 2. ul의 넓이를 구해서 input에 padding-left 주기
// 3. x button 함수 달아주기

// function createVisualList(text, js_visual_list) {		
// 	var visualList = document.createElement("li");
// 	var listText = document.createElement("span");
// 	var DelBtn = document.createElement("button");

// 	DelBtn.innerText = "❌";
// 	listText.innerText = text;

// 	visualList.className = 'item_visual';
// 	listText.className = 'text_visual';
// 	DelBtn.className = 'btn_delete';
// 	visualList.appendChild(listText);
// 	visualList.appendChild(DelBtn);

// 	DelBtn.addEventListener("click", () => {
// 		js_visual_list.removeChild(visualList);
// 	});

// 	return visualList;
// }

// function onVisualListClick(event){
// 	var js_visual_list = document.querySelector(".js_visual_list");
// 	var js_two_depthes = Array.from(document.querySelectorAll(".js_two_depth"));
// 	var elm = event.target;
// 	var text = elm.innerText;
// 	const pendingElement = createVisualList(text ,js_visual_list);
// 	js_visual_list.appendChild(pendingElement);
// 	js_two_depthes.forEach(function(js_two_depthes){
// 		js_two_depthes.style.display = "none";
// 	});
// }

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "ee424dad1a8fdd9ad4a5e461b503e8b7",
        language: "en-US"
    }
});

const moviesApi = {
    search: term =>
        api.get("search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    }),
};

const CompaniesApi = {
    search: term =>
        api.get('search/company', {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

let debounceCheck;

const debounce = (callback, milliseconds) => {
    return function () {        
        clearTimeout(debounceCheck);
        debounceCheck = setTimeout(() => {
            callback(...arguments);
        }, milliseconds);
    }
}

const painter = (answers) => {    
    console.log(answers.length)
    if(answers.length !== 0) {
        answers.forEach(function(answer){
            console.log(answer.original_title);
        });
    }
}
const getDataFromURL = async (obj) => {    
    try {
        const {
            data: { results: movieResults }
        } = await moviesApi.search(obj);
        answers = movieResults;
        painter(answers)
        // const {
        //     data: { results: companyResults }
        // } = await CompaniesApi.search(obj);    
        // console.log(companyResults);
        
    } catch {
        console.log('error')
    } finally {
        console.log('finally')
    }
};

const inputVal = document.querySelector('.input-de');
inputVal.addEventListener('keyup', debounce(({ target }) => {    
    if(target.value !== '') {
        getDataFromURL(target.value);
    }
},500));
