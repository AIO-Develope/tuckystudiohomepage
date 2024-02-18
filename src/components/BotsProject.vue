<template>
    <div class="py-5 background">
        <div class="container">
            <div class="row justify-content-center align-items-stretch">
                <div class="fly-in col-lg-4 text-center mb-4" style="animation-delay: 0.1s;">
                    <div class="card">
                        <img class="rounded-circle mt-4" src="../assets/images/bots/goofy.jpeg" alt="Bot 1" width="140" height="140">
                        <div class="card-body">
                            <strong class="card-title">Goofy</strong>
                            <p class="card-text">Elevate your Discord server with our versatile bot! From robust moderation tools to entertaining features like games and music, our bot has everything you need to enhance your community.</p>
                            <div class="read-more">Read more</div>
                        </div>
                    </div>
                </div>
                <div class="fly-in col-lg-4 text-center mb-4" style="animation-delay: 0.2s;">
                    <div class="card">
                        <img class="rounded-circle mt-4" src="../assets/images/bots/cryptix.png" alt="Bot 2" width="140" height="140">
                        <div class="card-body">
                            <strong class="card-title">Cryptix</strong>
                            <p class="card-text">Introducing Cryptix, your go-to Discord Crypto bot equipped with an array of special features tailored for crypto enthusiasts! With Cryptix, you can effortlessly display the latest cryptocurrency prices in the currency of your country, providing valuable insights to your community.</p>
                            <div class="read-more">Read more</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background{
    background-color: #f3f3f3;
}
.card {
    border: none;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 20px;
}

.card img {
    border-radius: 50%;
    width: 140px;
    height: 140px;
    object-fit: cover;
    margin: auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.card:hover {
    transform: translateY(-5px);
}

.card img {
    border-radius: 50%;
    width: 140px;
    height: 140px;
    object-fit: cover;
}

.card-title {
    font-size: 1.5rem;
    margin-top: 1rem;
    font-size: 30px;
}

.card-text {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    text-align: justify;
    margin: 30px;

}

.read-more {
    font-size: 1rem;
    color: #007bff;
    cursor: pointer;
    margin-top: auto;
}

.fly-in {
    animation: flyIn 0.5s ease forwards;
    opacity: 0;
    transform: translateY(-50px);
}

@keyframes flyIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
