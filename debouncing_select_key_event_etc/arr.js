const award_year_arr = []

const award_name_arr = [
    {
        id: 1,
        name: '서울영상광고제(Seoul Creative Festival)',
        part: 'a01'
    },
    {
        id: 2,
        name: '대한민국 광고대상(Korea Advertising Awards)',
        part: 'a02'
    },
    {
        id: 3,
        name: 'AD STARS',
        part: 'a03'
    },
    {
        id: 4,
        name: 'Cannes Lions International Festival of Creativity',
        part: 'a04'
    },
    {
        id: 5,
        name: 'ACT Responsible - Advertising Community Together',
        part: 'a05'
    },
    {
        id: 6,
        name: 'ADC*E',
        part: 'a06'
    },
    {
        id: 7,
        name: 'ADDY® Awards',
        part: 'a07'
    },
    {
        id: 8,
        name: 'AdPrint Festival',
        part: 'a08'
    },
    {
        id: 9,
        name: 'AICP Show',
        part: 'a09'
    },
    {
        id: 10,
        name: 'AME Awards',
        part: 'a10'
    },
    {
        id: 11,
        name: 'Asia Pacific Advertising Festival',
        part: 'a11'
    },
    {
        id: 12,
        name: 'AutoVision Film and Multimedia Festival',
        part: 'a12'
    },
    {
        id: 13,
        name: 'British Arrows',
        part: 'a13'
    },
    {
        id: 14,
        name: 'Cannes Corporate Media & TV Awards',
        part: 'a14'
    },
]

const js_input_arres = Array.from(document.querySelectorAll('.js_input_arr'));
const js_btnes = Array.from(document.querySelectorAll('.js_btn'));

function getAwardDate(){
    const now = new Date();
    const award_year = now.getFullYear()
    for(i=0; i<30; i++){
        award_year_arr.push(`${award_year - i}년`)
    }
}

js_input_arres.forEach(function(js_input_arr){
    js_input_arr.addEventListener('click', function(event){
        if(event.currentTarget.id === 'js_awardYear'){
            console.log(award_year_arr.length)
        }
    });
    js_input_arr.addEventListener('keyup', function(event){
        console.log(award_name_arr.filter(
                award => award.name.match(
                    new RegExp(event.currentTarget.value, "i")
                )
            )
        )
        // const text = document.createElement('span');
    })
});

function onPainter(list_name, listExample,){
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.className = 'items js_item_arr';
    span.className = 'text';
    span.innerText = list_name;
    li.appendChild(span);
    listExample.appendChild(li);
}

js_btnes.forEach(function(js_btn){
    js_btn.addEventListener('click',function(event){
        const ons = Array.from(document.querySelectorAll('.on')); // selected input text all type.
        const js_indexes = Array.from(document.querySelectorAll('.js_index'));
        console.log(js_indexes);
        // reset
        for (i=0; i<ons.length;i++){            
            ons[i].classList.remove('on');
            if(ons[i].classList.contains('js_multi')){
                ons[i].value = '';
            }
        }
        
        if(event.target.classList.contains('non_empty') && event.target.innerText !== ''){
            event.target.classList.add('non_empty');
        } else {
            event.target.classList.remove('non_empty');
        }
        js_indexes.forEach(function(js_index){
            // button innerText !== ''
            // 
            js_index.classList.remove('js_index');
        });

        const wrap = event.currentTarget.closest('.wrapItems');
        const input = wrap.querySelector('.js_input_arr');
        input.classList.add('on');
        const listExample = input.nextElementSibling;
        
        listExample.classList.add('active');
        
        if(input.classList.contains('js_award_year')){
            // make list
            if(listExample.children.length === 0){
                award_year_arr.forEach(function(year){
                    onPainter(year, listExample);
                });
            }
            const list_arres = Array.from(listExample.querySelectorAll('.js_item_arr'));
            list_arres.forEach(function(list){
                list.addEventListener('click', (event)=>{
                    for(i=0; i<list_arres.length; i++){
                        if(list_arres[i].classList.contains('focus')){
                            list_arres[i].classList.remove('focus');
                        }
                    }
                    event.currentTarget.classList.add('focus');
                    const wrap = event.currentTarget.closest('.wrapItems');
                    const btn = wrap.querySelector('.btn_arr');
                    const text = event.currentTarget.querySelector('.text').innerText;                    
                    btn.classList.add('non_empty');
                    btn.innerText = text;
                    listExample.classList.remove('active');
                });
            });
        }
        if(input.classList.contains('js_award_name')){
            input.classList.add('js_index');
            input.value = '';
            input.focus();
            console.log(award_name_arr);
            // make list
            console.log(listExample)
        }
    })
});

// arr input 클릭 on 지우기
function init() {
    getAwardDate();
}
init();