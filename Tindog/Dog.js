class Dog {
    constructor(data) {
        Object.assign(this, data)

        this.dogCardHtml = `
        <img id="displayed-dog-pic" class="displayed-dog-pic" src=${this.avatar} alt="picture of ${this.name}">
        <div class="dog-info">
            <h1 class="info dog-name">${this.name}, ${this.age}</h1>
            <h2 class="info dog-message">${this.bio}</h2>
        </div> `

        this.likedDogCardHtml = `
            <div class="cutie-card">
                <img class="displayed-dog-pic" src=${this.avatar} alt="picture of ${this.name}">
                <div class="last-page-dog-info">
                    <h1 class="info dog-name">${this.name}, ${this.age}</h1>
                    <h2 class="info dog-message">${this.bio}</h2>
                </div>
            </div>
        `
    }

}

export default Dog