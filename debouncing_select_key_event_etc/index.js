// input 클릭 enter key

const input = document.querySelector('.input');
const inputs = Array.from(document.querySelectorAll('.input'));
const js_items = Array.from(document.querySelectorAll('.js_item'));
const js_item_multies = Array.from(document.querySelectorAll('.js_item_multi'));
const body = document.querySelector("body");

let notice_id; // saving input single type id
let input_temp; // temporary saving input single type value

inputs.forEach(function(input){    
    input.addEventListener('click',function(event){
        notice_id = event.target.getAttribute('id');
        
        const ons = Array.from(document.querySelectorAll('.on')); // selected input text all type.
        const actives = Array.from(document.querySelectorAll('.active')); // shown list
        
        // reset
        for (i=0; i<ons.length;i++){            
            ons[i].classList.remove('on');
        }
        
        for (i=0; i<actives.length;i++){
            actives[i].classList.remove('active');
        }

        // setting
        event.currentTarget.classList.add('on'); // new selected input text all type.
        event.currentTarget.nextElementSibling.classList.add('active'); // new shown list
    });
    input.addEventListener('focus',function(event){
        event.currentTarget.classList.add('on');
        event.currentTarget.nextElementSibling.classList.add('active');    
    });
});

window.addEventListener('keyup', function(event){
    if(event.keyCode === 40) { // Down Arrow key ↓
        const on = document.querySelector('.on'); // selected input text all type.
        
        if(on.nextElementSibling.classList.contains('active')){
            const arr_li = Array.from(on.nextElementSibling.querySelectorAll('.focus')); // focused list
            const items = Array.from(on.nextElementSibling.querySelectorAll('.js_item')); // all single type list
            const item_multies = Array.from(on.nextElementSibling.querySelectorAll('.js_item_multi')); // all multi type list
            
            if(arr_li.length === 0 && (items.length !== 0 || item_multies.length !==0)) {
                on.nextElementSibling.firstElementChild.classList.add('focus'); // setting first element add class 'focus'
            } else {
                const forty = on.nextElementSibling.querySelector('.focus'); // selected list contains class 'focus'
                
                if(forty !== null) {                    
                    if(forty.nextElementSibling !== null) {
                        forty.classList.remove('focus');                    
                        forty.nextElementSibling.classList.add('focus');
                    }
                }
            }
        }
    }
    
    if (event.keyCode === 38){ // Up Arrow key ↑
        const on = document.querySelector('.on'); // selected input text all type.
        
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
    if (event.keyCode === 13) { // enter key ↳
        const on = document.querySelector('.on');
        const stad = on.nextElementSibling.querySelector('.js_item.focus'); // single type selected
        const staM = on.nextElementSibling.querySelector('.js_item_multi.focus'); // multi type selected
        const hidden_value = document.getElementById(`${notice_id}_value`); // when not selecting(enter event), value
        const temp_value = document.getElementById(`${notice_id}_temp`); // when not selecting(enter event), keyword
        
        if(on !== null && (stad !== null || staM !== null)){
            if(stad !== null) { // single input
                const text = stad.querySelector('.text').innerText;
                on.value = text;
                hidden_value.value = text;
                temp_value.value = input_temp; // input_temp inputed keyword
                
            } else if(staM !== null) { // multi input                
                const wrap = staM.closest('.wrapItems');
                const listSelected = wrap.querySelector('.listSelected');
                const text = staM.querySelector('.text').innerText;                
                const pendingElement = createList(text, listSelected);
                const limit_num = parseInt(on.dataset.num);
                if(limit_num === listSelected.children.length) {
                    alert(limit_num + '까지 선택할 수 있습니다.')
                } else if(listSelected.children.length < limit_num){
                    listSelected.appendChild(pendingElement);
                }

                handleInput(wrap);

                const listExample = wrap.querySelector('.listExample');

                // reset
                if(listExample.children.length !== 0){ 
                    while (listExample.firstChild) {
                        listExample.removeChild(listExample.firstChild);            
                    }
                }
                wrap.querySelector('.multi_input').value = '';
            }
        }
        // multi 
        // ul > li 싹 지우고, on에 value 지운다. blur는 하지 마라.
        // on.blur();
    }
    if (event.keyCode === 8) { // backspace
        // multi일 때, 한번 누르면 나중에 입력한 값 포커스 한번 더 누르면 지운다.
    }
});

function onListClick(js_items){ // single type list click function
    js_items.forEach(function(js_item){
        js_item.addEventListener('click', function(event){
            const hidden_value = document.getElementById(`${notice_id}_value`); // when not selecting(enter event), value
            const temp_value = document.getElementById(`${notice_id}_temp`); // when not selecting(enter event), keyword
            const wrap = event.currentTarget.closest('.wrapItems');
            const items = wrap.querySelectorAll('.focus');
            if(items.length > 0){
                for(i=0; i<items.length; i++){
                    items[i].classList.remove('focus');
                }
            }
            js_item.classList.add('focus');
            hidden_value.value = event.currentTarget.querySelector('.text').innerText;
            temp_value.value = input_temp;
            wrap.querySelector('.input').value = event.currentTarget.querySelector('.text').innerText;
            wrap.querySelector('.listExample').classList.remove('active');
        })
    });
}

function handleInput(wrap){
    const multi_inner = wrap.querySelector('.multi_inner');
    const input = wrap.querySelector('.multi_input');
    const listSelected = wrap.querySelector('.listSelected');

    // console.log(multi_inner.clientWidth, input.clientWidth,Math.ceil(listSelected.clientWidth + 0.5));
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

function onListMultiClick(js_item_multies){ // multi type list click function
    js_item_multies.forEach(function(js_item_multi){
        js_item_multi.addEventListener('click',function(event){
            const on = document.querySelector('.on');
            const wrap = event.currentTarget.closest('.wrapItems');
            const listSelected = wrap.querySelector('.listSelected');        
            const target = event.currentTarget;
            const text = target.querySelector('.text').innerText;
            const pendingElement = createList(text, listSelected);
            const num = parseInt(on.dataset.num);
            
            if(listSelected.children.length == num) {
                alert(num + '까지 선택할 수 있습니다.')
            } else if(listSelected.children.length < num){
                listSelected.appendChild(pendingElement);
            }

            handleInput(wrap);
            
            const listExample = wrap.querySelector('.listExample');
            
            // reset
            if(listExample.children.length !== 0){ 
                while (listExample.firstChild) {
                    listExample.removeChild(listExample.firstChild);            
                }
            }
            wrap.querySelector('.multi_input').value = '';
        })
    });
}

// example call API with axios
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "ee424dad1a8fdd9ad4a5e461b503e8b7",
        language: "en-US"
    }
});

// const params = new URLSearchParams()
// params.append('query', encodeURIComponent('aa'))
// params.append('api_key', "ee424dad1a8fdd9ad4a5e461b503e8b7")
// params.append('language', "en-US")
// params.append('visual', 'xx01')
// params.append('visual', 'xx02')
// params.append('visual', 'xx03')
// params.append('visual', 'xx03')


const moviesApi = {
    // search: term =>
    //     api.get("search/movie", {
    //     params: params,
    // }),
    search : (term) => 
        api.get("search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    })
};

const CompaniesApi = {
    search: term =>
        api.get('search/company', {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

// search/collection
// search/keyword
// search/person
// search/tv

// debunce function
let debounceCheck;

const debounce = (callback, milliseconds) => {
    return function () {        
        clearTimeout(debounceCheck);
        debounceCheck = setTimeout(() => {
            callback(...arguments);
        }, milliseconds);
    }
}

// creating lists
const onCreateList = (text, list, type) => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    
    span.innerText = text;
    if(type === 'single') {
        li.className = 'js_item items'; // single type Lists
    } else {
        li.className = 'js_item_multi items'; // multi type Lists
    }
    span.className = 'text';
    
    li.appendChild(span);
    list.appendChild(li);
}

// creating direct input list or no result
const onCreateNoResult = (obj, list, type) => {
    let li = document.createElement('li');
    let span_text = document.createElement('span');
    let span_no_result = document.createElement('span');

    span_text.innerText = obj; // input value
    span_no_result.innerText = '직접입력';
    if(type === 'single') {
        li.className = 'js_item items'; // single type Lists
    } else {
        li.className = 'js_item_multi items'; // multi type Lists
    }
    span_text.className = 'text';
    span_no_result.className = 'text_no_result'; // '직접입력'

    li.appendChild(span_text);
    li.appendChild(span_no_result);
    list.appendChild(li);
}

const painter = (answers, id, listExample, obj) => { // painting lists
    if(listExample.children.length !== 0){ // reset
        while (listExample.firstChild) {
            listExample.removeChild(listExample.firstChild);            
        }
    }

    if(listExample.children.length === 0) {
        let type_val;
        if(id === 'js_brand' || id === 'js_brand02') { // single input example
            type_val = 'single';            
        } else if(id === 'js_title' || id === 'js_title02'){ // multi input example
            type_val = 'multi';
        }
        if(answers.length !== 0) {
            answers.forEach(function(answer){                
                if(id === 'js_brand' || id === 'js_brand02'){ // single input example
                    onCreateList(answer.original_title, listExample, type_val); // creating lists
                } else if(id === 'js_title' || id === 'js_title02'){ // multi input example
                    onCreateList(answer.name, listExample, type_val); // creating lists
                }
            });            
        }
        // creating direct input list or no result
        onCreateNoResult(obj, listExample, type_val);

        const js_items = Array.from(listExample.querySelectorAll('.js_item')); // single type Lists
        const js_item_multies = Array.from(listExample.querySelectorAll('.js_item_multi')); // multi type Lists        
        onListClick(js_items); // single type list click function
        if(id === 'js_title') {
            onListMultiClick(js_item_multies); // multi type list click function
        } else if(id === 'js_title02'){
            onListMultiClick(js_item_multies); // multi type list click function
        }
    }
}
const getDataFromURL = async (obj ,id, listExample) => { // call API
    try {        
        if(id === 'js_brand' || id === 'js_brand02') { // single types
            const {
                data: { results: movieResults }
            } = await moviesApi.search(obj);
            answers = movieResults;
        } else if(id === 'js_title' || id === 'js_title02'){ // multi types
            const {
                data: { results: companyResults }
            } = await CompaniesApi.search(obj);    
            answers = companyResults;
        }
        painter(answers ,id, listExample, obj); // painting lists
        
    } catch {
        console.log('error')
    } finally {
        console.log('finally '+obj)
    }
};


const inputVals = Array.from(document.querySelectorAll('.js_input_de')); // inputs
inputVals.forEach(function(inputVal){
    // inputVal.addEventListener('keyup', debounce(({ target }) => {        
    //     const id_value = target.id;
    //     const listExample = target.nextElementSibling;
    //     if(target.value !== '') {
    //         getDataFromURL(target.value, id_value, listExample);
    //     }
    // },500));
    inputVal.addEventListener('keyup', debounce((event) => { // input keyup event, with debouncing function
        const target = event.target;
        const id_value = target.id;
        const listExample = target.nextElementSibling;        
        if(target.value !== '' && event.keyCode !== 13 && event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
            input_temp = target.value;
            getDataFromURL(target.value, id_value, listExample); // call API
        }
    },500));
});

// 특정 영역 외 클릭 
function clickBodyEvent(event) {
    const input_states = Array.from(document.querySelectorAll('.input_state'));
    const input_ones = Array.from(document.querySelectorAll('.input.on'));    
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

    input_ones.forEach(function(input_on){
        if(input_on.classList.contains('js_single')){
            const temp_id = input_on.getAttribute('id');
            temp_input = document.getElementById(`${temp_id}_temp`);

            if(temp_input.value !==''){
                getDataFromURL(temp_input.value, temp_id, document.getElementById(`${temp_id}`).nextElementSibling);
            } else if(document.getElementById(`${temp_id}`).nextElementSibling.children.length !== 0){
                while (document.getElementById(`${temp_id}`).nextElementSibling.firstChild) {
                    document.getElementById(`${temp_id}`).nextElementSibling.removeChild(document.getElementById(`${temp_id}`).nextElementSibling.firstChild);
                }
            }
        }        
    });

    input_states.forEach(function(input_state){
        const input_id = `${input_state.getAttribute('id').split('_')[0]}_${input_state.getAttribute('id').split('_')[1]}`
        const js_input = document.getElementById(`${input_id}`);
        js_input.value = input_state.value;
    });
}

body.addEventListener('click', clickBodyEvent);

// 윤달을 고려한 년,월에 따른 일수 구하기
const monarr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

function getMonthDay(year, month) {
    if ((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) && month==2) {
        date = 29;
    } else {
        date = monarr[month-1];
    }

    return date;
}

// 현재 달과 알고자 하는 달의 차이
function getDateSapn(now, year, month){
    // now year month
    const str_year_now = String(now.getFullYear());
    let num_month_now = now.getMonth() + 1;
    const str_month_now = `${num_month_now < 10 ? '0' + String(num_month_now): String(num_month_now) }`
    const str_now_now = str_year_now + str_month_now;
    
    // input year month
    const str_year = String(year);
    const str_month = `${month < 10 ? '0' + String(month): String(month)}`;
    const str_now = str_year + str_month;

    // calculate different monthes now and inputs
    const start_year = parseInt(str_now_now.substring(0,4));
    const start_month = parseInt(str_now_now.substring(4,6));

    const end_year = parseInt(str_now.substring(0,4));
    const end_month = parseInt(str_now.substring(4,6));

    const diff_month = (end_year - start_year)*12 + (end_month - start_month);
    
    return diff_month;
}

// onPaintDate의 callback 함수
function getSelectDate(date, len){
    const js_select_date = document.querySelector('.js_select_date');
    if(len === 0) {
        const select_opt = document.createElement('option');
        select_opt.innerText = '=DAY=';    
        js_select_date.appendChild(select_opt);
    }
    for(i=1; i<=date; i++){
        const select_opt = document.createElement('option');
        select_opt.innerText = `${i}일`;
        select_opt.value = `${i < 10 ? '0' + i : i }`;
        js_select_date.appendChild(select_opt);
    }
};
// 년 월에 따른 일수 뿌려주기
function onPaintDate(year, month) {
    const js_select_date = document.querySelector('.js_select_date');
    let temp_date = '';
    
    temp_date = getMonthDay(year,month);

    // reset
    if(js_select_date.children.length > 1) {
        while (js_select_date.firstChild) {
            js_select_date.removeChild(js_select_date.firstChild);            
        }
    }
    // re-painting
    getSelectDate(temp_date, js_select_date.children.length);
}
// 날짜에 관한 종합 함수
function onAllThatDate(year, month, now) {
    const js_box_date = document.querySelector('.js_box_date');
    let temp_span = '';
    
    if(year !== '', month !== ''){
        temp_span = getDateSapn(now, year, month);
        if(temp_span >= -3 && temp_span <= 1) {            
            js_box_date.style.display = 'inline-block';
            onPaintDate(year, month);
            js_box_date.querySelector('select').disabled = false;
        } else {
            js_box_date.querySelector('select').disabled = true;
            js_box_date.style.display = 'none';
            
        }
    }
}
// 날짜 구하기 시작
function getDateSelect() {
    const now = new Date();

    const js_select_year = document.querySelector('.js_select_year');
    const js_select_month = document.querySelector('.js_select_month');

    for(i=0; i<=30; i++){        
        const select_opt = document.createElement('option');
        select_opt.innerText = `${now.getFullYear() - i}년`;
        select_opt.value = now.getFullYear() - i;
        js_select_year.appendChild(select_opt);
    }

    for(i=1; i<=12; i++){
        const select_opt = document.createElement('option');
        select_opt.innerText = `${i}월`;
        select_opt.value = `${i < 10 ? '0' + i : i }`;
        js_select_month.appendChild(select_opt);
    }

    let temp_year = '';
    let temp_month = '';

    js_select_year.addEventListener('change', (event) => {
        temp_year = parseInt(event.target.value);
        onAllThatDate(temp_year, temp_month, now);
    });
    js_select_month.addEventListener('change', (event) => {
        temp_month = parseInt(event.target.value);
        onAllThatDate(temp_year, temp_month, now);
    });
}

function init(){
    getDateSelect();
}

// var testValue = 'This is the Cookbook'; 
// var subValue = 'Cook'; 
// var iValue = testValue.indexOf(subValue); 
// console.log(iValue); 
// // String 객체의 indexOf 메서드는 인덱스 혹은 부분 문자열의 첫 번째 글자가 있는 위치를 나타내는 숫자를 반환하고, 문자열에서 첫 번째 
// // 문자의 인덱스는 0 입니다. 
// // 부분 문자열이 대상 문자열 안에 있는지 없는지 확인하기 위해서는 반환되는 값이 -1 인지 살펴보면 됩니다 
// if (iValue != -1) { 
//     console.log('찾고자 하는 부분 문자열이 있습니다.'); 
// } 
// // indexOf 메서드는 두 개의 인자를 갖습니다.
// // 첫 번째 인자는 찾고자 하는 부분 문자열이고, 두 번째 인자는 검색을 시작할 위치의 인덱스 값입니다. 
// // 두 번째 인자는 생략 가능합니다. 
// var str = 'Have you had a dinner?'; 
// var subStr = 'dinner'; 
// var iVal = str.indexOf(subStr, 8); 
// console.log(iVal); 
// // 15 => 부분 문자열의 인덱스 15를 반환 
// // indexOf 메서드는 왼쪽에서 오른쪽으로 탐색합니다. 그러나 때로는 문자열을 오른쪽에서 왼쪽으로 탐색하고 싶을 때가 있습니다. 
// // 이럴 경우에는 String 객체의 또 다른 메서드인 lastIndexOf 를 사용하면 됩니다. 
// // lastIndexOf 는 가장 마지막에 나타난 부분 문자열의 인덱스 위치를 반환합니다. 
// var testStr = 'I have been there'; 
// var findStr = 'been'; 
// var findIndex = testStr.lastIndexOf(findStr); 
// console.log(findIndex); 
// // 7 
// // lastIndexOf 의 두 번째 인수는 indexOf 에서와 마찬가지로 생략할 수 있으며, 검색 시작 위치를 전달 받습니다. 
// // 검색을 시작할 위치는 오른쪽 부터 셈한 값입니다. 
// console.log(testStr.lastIndexOf('have', 5)); 
// // 2 
// console.log(testStr.lastIndexOf('there', 7)); 
// // -1 반환, 찾지 못함 
// // 7인 인덱스 위치에서 오른쪽 부터 검색하므로 찾지 못함 
// // 즉,인덱스 7 의 위치에서 'I have b' 의 b 위치부터 오른쪽에서 왼쪽으로 검색하기 때문에 찾고자 하는 문자열이 없어서 -1 을 반환

// // 출처: https://webclub.tistory.com/568 [Web Club]


init();
