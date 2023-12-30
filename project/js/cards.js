//https://jsonplaceholder.typicode.com/posts

const cards = document.querySelector(".cards")


const getData = async () => {
    try {

        const request = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await request.json()
        data.forEach(item => {
            const div = document.createElement("div")
            div.setAttribute("class", "card")

            div.innerHTML = `
            <img src="https://w.forfun.com/fetch/70/70436782aa3d9a6a8f40a66b1727b79e.jpeg" alt="wallpaper" />
            <p>${item.title}</p>
            <p>${item.body}</p>
            `
            cards.append(div)
        })
    } catch (e) {
        console.log(e)
    }
}

getData()