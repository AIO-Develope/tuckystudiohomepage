<template>
    <div class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-4 text-center fly-in" style="animation-delay: 0.1s; margin-bottom: 40px;">
                    <img class="rounded-circle mb-4" src="../assets/images/bots/goofy.jpeg" alt="Generic placeholder image" width="140" height="140">
                    <h2>Bot 1</h2>
                    <p class="mb-4">Elevate your Discord server with our versatile bot! From robust moderation tools to entertaining features like games and music, our bot has everything you need to enhance your community. Keep your server safe, engage your members, and customize your experience with ease. Join thousands of satisfied server owners and invite our bot today to see the difference!</p>
                    <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
                </div>
                <div class="col-lg-4 text-center fly-in" style="animation-delay: 0.2s; margin-bottom: 40px;">
                    <img class="rounded-circle mb-4" src="../assets/images/bots/cryptix.png" alt="Generic placeholder image" width="140" height="140">
                    <h2>Bot 2</h2>
                    <p class="mb-4">
Introducing Cryptix, your go-to Discord Crypto bot equipped with an array of special features tailored for crypto enthusiasts! With Cryptix, you can effortlessly display the latest cryptocurrency prices in the currency of your country, providing valuable insights to your community.</p>
                    <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .square-img {
        width: 100%;
        height: auto;
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
