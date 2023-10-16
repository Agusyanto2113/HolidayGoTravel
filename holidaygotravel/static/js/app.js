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



const startRecordingButton = document.getElementById('startButton');
const transcriptionDiv = document.getElementById('output');
let isRecording = false;

        startRecordingButton.addEventListener('click', () => {
            if (!isRecording) {                
                isRecording = true;

                const recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'id-ID';

                recognition.onresult = function(event) {
                    const result = event.results[event.results.length - 1];
                    const transcript = result[0].transcript;
                    transcriptionDiv.innerHTML = transcript;

                    if (result.isFinal) {
                        // Send the audio file to the server for transcription
                        const formData = new FormData();
                        formData.append('audio', new Blob([transcript], { type: 'audio/wav' }));

                        fetch('/transcribe_audio/', {
                            method: 'POST',
                            body: formData,
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                console.log('Transcription saved:', data.text);
                            } else {
                                console.error('Transcription failed:', data.error);
                            }
                        });
                    }
                };

                recognition.start();
            
                // Stop recording after 3 seconds
                setTimeout(() => {
                    recognition.stop();
                    isRecording = false;
                    
                }, 3000); // 3 seconds

            } else {
                
                isRecording = false;
                recognition.stop();
            }
        });



const chatInput = document.querySelector(".chat-input .textarea textarea");
const sendChatBtn = document.querySelector(".chat-input .sendbtn span");
let userMessage;

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    console.log(userMessage);
}

sendChatBtn.addEventListener("click",handleChat);



