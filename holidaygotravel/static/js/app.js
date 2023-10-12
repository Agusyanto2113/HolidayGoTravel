Array.from(document.getElementsByTagName('input')).forEach((e,i)=>{
    e.addEventListener('keyup',(e)=>{
        if (e.value.length > 0){
            document.getElementsByClassName('bi-caret-down-fill')[i].style.transform = "rotate(180deg)";
        }else{
            document.getElementsByClassName('bi-caret-down-fill')[i].style.transform = "rotate(0deg)";
        }
    })
})

let menu_btn = document.getElementsByClassName('bi-three-dots')[0];
let menu_bx = document.getElementById('menu_bx');

menu_btn.addEventListener('click', ()=>{
    menu_bx.classList.toggle('ul_active');
})



const startButton = document.getElementById("startButton");
const output = document.getElementById("output");
let recognition;
let timeout;

    startButton.addEventListener("click", function() {
        output.textContent = "Listening for speech...";
        startSpeechRecognition();
    });

    function startSpeechRecognition() {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = function(event) {
            clearTimeout(timeout); // Reset the timeout
            const transcript = event.results[0][0].transcript;
            output.textContent = transcript;
            startTimeout();
        };

        recognition.onend = function() {
            output.textContent = "Enter a message....";
            startTimeout();
        };

        startTimeout();
            recognition.start();
        }

        function startTimeout() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                recognition.stop();
                output.textContent = "";
            }, 3000); // 3 seconds (adjust as needed)
        }



const chatInput = document.querySelector(".chat-input .textarea textarea");
const sendChatBtn = document.querySelector(".chat-input .sendbtn span");
let userMessage;

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    console.log(userMessage);
}

sendChatBtn.addEventListener("click",handleChat);



