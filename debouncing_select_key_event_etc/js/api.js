// call the api
const otherApi = axios.create({
    baseURL: "https://api.unsplash.com/",
    params: {
        client_id: "r-ZzHz6OnqIJqU0kQcnIO4Xcps636gLnvXL6AqDsijk",
    }
})

const imgApi = {
    search: (term,pages) => 
    otherApi.get("/search/photos", {
        params: {
            query: encodeURIComponent(term),
            per_page: 20,
            page: pages,
        }
    })
}

// debouncing function
let debounceCheck;

const debounce = (callback, milliseconds) => {
    return function () {
        clearTimeout(debounceCheck);
        debounceCheck = setTimeout(() => {
            callback(...arguments);
        }, milliseconds);
    }
}


const onCreateList = (text, list, type, id) => {
    
    let li = document.createElement("li");
    let span = document.createElement("span");
    const id_value = document.getElementById(`${id}_value`).value;

    span.innerText = text;
    if(type === "single") {
        if(text === id_value) {
            li.className = "js_item focus items";
        } else {
            li.className = "js_item items";
        }
    }

    span.className = "text";
    li.appendChild(span);
    list.appendChild(li);
}
// painting lists
const painter = (answers, id, list, obj, type) => {
     // reset
    if(list.children.length !== 0){
        list.innerHTML = '';
    }
    if(list.children.length === 0){
        if(answers.length !== 0 && type ==="single") {
            answers.forEach(function(answer){
                let text ="";
                if(answer.description === null){
                    text = `${answer.id} text`;
                } else {
                    text = `${answer.description.split(" ")[0]} ${answer.id}`;
                }
                onCreateList(text, list, type, id); // creating lists
            });
        }
    }
}

// call Api
const getDataFromURL = async (obj ,id, list) => {
    if(id==="js_person1") {
        try {
            const {
                data : { results : person1_result}
            } = await imgApi.search(obj);
            answers = person1_result;
            type = "single";
        } catch {
            console.log('error');
        } finally {
            console.log('finally '+obj)
        }
    }
    painter(answers, id, list, obj, type);
}

// single type
const allInputs = Array.from(document.querySelectorAll(".js_single")) ;

allInputs.forEach((input)=>{
    input.addEventListener("keyup", debounce((event)=>{
        const wrap = event.target.closest(".wrapItems");
        const target = event.target;
        const targetId = target.id;
        const list = wrap.querySelector(".listExample");
        // call api
        if(event.keyCode !== 13 && event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
            getDataFromURL(target.value, targetId, list);
        }
    },500));
})