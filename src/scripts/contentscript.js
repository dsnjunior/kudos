import images from '../content/images.json'
import messages from '../content/messages.json'

function removeKudos(e) {
  if(e.target.checked) {
    document.querySelectorAll('.kudos-generator-button').forEach((button) => {
      button.remove()
    })
  }
}

function handleKudos() {
  const approveElement = document.getElementById('pull_request_review[event]_approve')
  const commentElement = document.getElementById('pull_request_review[event]_comment')
  const rejectElement = document.getElementById('pull_request_review[event]_reject')

  if (commentElement) {
    commentElement.addEventListener('change', removeKudos)
  }

  if (rejectElement) {
    rejectElement.addEventListener('change', removeKudos)
  }

  if (approveElement) {
    approveElement.addEventListener('change', (e) => {
      if(e.target.checked) {
        const textArea = document.getElementById('pull_request_review_body')
        document.querySelectorAll('#pull_requests_submit_review .Overlay-footer').forEach((wrapper) => {
          const label = document.createElement('span')
          label.innerText = 'Generate Kudos 🔥'
          label.className = 'Button-label'

          const content = document.createElement('span')
          content.className = 'Button-content'
          content.appendChild(label)

          const button = document.createElement('button')
          button.className = 'Button--primary Button--small Button float-left kudos-generator-button'
          button.style.backgroundColor = 'rebeccapurple'
          button.appendChild(content)

          button.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            const image = images[Math.floor(Math.random() * images.length)];
            const message = messages[Math.floor(Math.random() * messages.length)];

            textArea.value = `![image](https://kudos-generator.s3.us-east-1.amazonaws.com/${image})\n${message}`;
            const previewTab = document.querySelector('[id^="preview_tab_"]')
            
            if (previewTab && previewTab.attributes['aria-selected'].value === 'true') {
              previewTab.click()
            }
          })
          wrapper.appendChild(button)
        })
      }
    })
  }
}

handleKudos()
document.addEventListener('turbo:frame-load', () => {
  handleKudos()
})