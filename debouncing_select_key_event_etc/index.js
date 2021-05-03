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
            const items = Array.from(on.nextElementSibling.querySelectorAll('.js_item'));
            const item_multies = Array.from(on.nextElementSibling.querySelectorAll('.js_item_multi'));
            
            if(arr_li.length === 0 && (items.length !== 0 || item_multies.length !==0)) { // single multi 출돌
                on.nextElementSibling.firstElementChild.classList.add('focus');
            } else {
                const forty = on.nextElementSibling.querySelector('.focus');
                
                if(forty !== null) {                    
                    if(forty.nextElementSibling !== null) {
                        forty.classList.remove('focus');                    
                        forty.nextElementSibling.classList.add('focus');
                    }
                }
            }
        }
    }
    
    if (event.keyCode === 38){ // Up Arrow key
        const on = document.querySelector('.on');
        
        if(on.nextElementSibling.classList.contains('active')){
            const forty = on.nextElementSibling.querySelector('.focus');
            
            if(forty !== null) {
                if(forty.previousElementSibling !== null) {
                    forty.classList.remove('focus');
                    forty.previousElementSibling.classList.add('focus');
                }
            } 
        }
    }
    if (event.keyCode === 13) { // enter key
        const on = document.querySelector('.on');
        const stad = on.nextElementSibling.querySelector('.js_item.focus');
        const staM = on.nextElementSibling.querySelector('.js_item_multi.focus');
        
        if(on !== null && (stad !== null || staM !== null)){
            if(stad !== null) { // single input
                const text = stad.querySelector('.text').innerText;
                on.value = text;
            } else if(staM !== null) { // multi input
                const wrap = staM.closest('.wrapItems');
                const listSelected = wrap.querySelector('.listSelected');
                const text = staM.querySelector('.text').innerText;
                const pendingElement = createList(text, listSelected);

                listSelected.appendChild(pendingElement);
                handleInput(wrap);
            }
        }
    }
});

function onListClick(js_items){
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
}

function onListMultiClick(js_item_multies){
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
}


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

const onCreateList = (text, list, type) => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    
    span.innerText = text;
    if(type === 'single') {
        li.className = 'js_item items';        
    } else {
        li.className = 'js_item_multi items';
    }
    span.className = 'text';
    
    li.appendChild(span);
    list.appendChild(li);
}

const onCreateNoResult = (obj, list, type) => {
    let li = document.createElement('li');
    let span_text = document.createElement('span');
    let span_no_result = document.createElement('span');

    span_text.innerText = obj;
    span_no_result.innerText = '직접입력';
    if(type === 'single') {
        li.className = 'js_item items';
    } else {
        li.className = 'js_item_multi items';
    }
    span_text.className = 'text';
    span_no_result.className = 'text_no_result';

    li.appendChild(span_text);
    li.appendChild(span_no_result);
    list.appendChild(li);
}

const painter = (answers, id, listExample, obj) => {
    if(listExample.children.length !== 0){
        while (listExample.firstChild) {
            listExample.removeChild(listExample.firstChild);            
        }
    }
    if(listExample.children.length === 0) {
        let type_val;
        if(id === 'js_brand') { // single input example
            type_val = 'single';            
        } else if(id === 'js_title'){ // multi input example
            type_val = 'multi';
        }
        if(answers.length !== 0) {
            answers.forEach(function(answer){                
                if(id === 'js_brand'){ // single input example
                    onCreateList(answer.original_title, listExample, type_val);                    
                } else if(id === 'js_title'){ // multi input example
                    onCreateList(answer.name, listExample, type_val);
                }
            });            
        }
        onCreateNoResult(obj, listExample, type_val);
        
        const js_items = Array.from(listExample.querySelectorAll('.js_item'));                
        const js_item_multies = Array.from(listExample.querySelectorAll('.js_item_multi'));
        onListMultiClick(js_item_multies);
        onListClick(js_items);
    }
}
const getDataFromURL = async (obj ,id, listExample) => {    
    try {        
        if(id === 'js_brand') {
            const {
                data: { results: movieResults }
            } = await moviesApi.search(obj);
            answers = movieResults;
        } else if(id === 'js_title'){
            const {
                data: { results: companyResults }
            } = await CompaniesApi.search(obj);    
            answers = companyResults;
        }
        painter(answers ,id, listExample, obj);
        
    } catch {
        console.log('error')
    } finally {
        console.log('finally '+obj)
    }
};


const inputVals = Array.from(document.querySelectorAll('.js_input_de'));
inputVals.forEach(function(inputVal){
    // inputVal.addEventListener('keyup', debounce(({ target }) => {        
    //     const id_value = target.id;
    //     const listExample = target.nextElementSibling;
    //     if(target.value !== '') {
    //         getDataFromURL(target.value, id_value, listExample);
    //     }
    // },500));
    inputVal.addEventListener('keyup', debounce((event) => {
        const target = event.target;
        const id_value = target.id;
        const listExample = target.nextElementSibling;
        if(target.value !== '' && event.keyCode !== 13 && event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
            getDataFromURL(target.value, id_value, listExample);
        }
    },500));
});

// https://image.tmdb.org/t/p/w300${imageUrl}

const monarr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

function getMonthDay(year, month) {
    if ((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) && month==2) {
        date = 29;
    } else {
        date = monarr[month-1];
    }

    return date;
}

// x = getMonthDay(2008,2);