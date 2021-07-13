// up, dwon, right, left, enter
window.addEventListener("keyup", (event) => {
    const target = event.target;
    const targetId = target.id;
    let keyWord = target.value;
    if(target.classList.contains("js_input")){
        const wrap = target.closest(".wrapItems")
        const list = wrap.querySelector(".listExample");
        
        if(target.classList.contains("on") && list.classList.contains("active") && list.children.length > 0) {
            const keyCode = event.keyCode;
            // arrow key
            if(keyCode === 40) {
                const focuses = Array.from(list.querySelectorAll(".focus"));
                if(focuses.length === 0) {
                    list.firstElementChild.classList.add('focus'); // setting first element add class 'focus'
                } else {
                    const nowFocus = list.querySelector(".focus");
                    if(nowFocus && nowFocus.nextElementSibling) {
                        nowFocus.classList.remove("focus");
                        nowFocus.nextElementSibling.classList.add("focus");
                    }
                }
            }
            // up key
            if(keyCode === 38) {
                const nowFocus = list.querySelector(".focus");
                if(nowFocus && nowFocus.previousElementSibling){
                    nowFocus.classList.remove("focus");
                    nowFocus.previousElementSibling.classList.add("focus");
                }
            }

            // enter key
            if(keyCode === 13) {
                const focused = list.querySelector(".focus");
                const text = focused.querySelector(".text").innerText;

                const temp_value = document.getElementById(`${targetId}_value`);
                const temp_keyword = document.getElementById(`${targetId}_keyword`);
                
                temp_value.value = text;
                temp_keyword.value = keyWord;
                
                target.value = text;
            }
        }
    }
})