import images from '../content/images.json'
import messages from '../content/messages.json'

const copy = document.getElementById("copy");
copy?.addEventListener("click", () => {
  const messageWrapper = document.getElementById("message");
  const image = messageWrapper?.querySelector("img")?.src;
  const message = messageWrapper?.querySelector("p")?.innerText;

  navigator.clipboard.writeText(`![image](${image})\n${message}`);
});

function setKudos() {
  const image = images[Math.floor(Math.random() * images.length)];
  const message = messages[Math.floor(Math.random() * messages.length)];

  const messageWrapper = document.getElementById("message");
  messageWrapper
    .querySelector("img")
    .setAttribute(
      "src",
      `https://kudos-generator.s3.us-east-1.amazonaws.com/${image}`
    );
  messageWrapper.querySelector("p").innerHTML = message;
}
setKudos();
const getAnother = document.getElementById("get-another");
getAnother?.addEventListener("click", setKudos);