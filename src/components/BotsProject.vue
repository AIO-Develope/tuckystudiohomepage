<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-3 text-center fly-in" style="animation-delay: 0.1s;">
                <img class="rounded-circle mb-3" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                <h2>Bot 1</h2>
                <p class="mb-4">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
            </div>
            <div class="col-lg-3 text-center fly-in" style="animation-delay: 0.2s;">
                <img class="rounded-circle mb-3" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                <h2>Bot 2</h2>
                <p class="mb-4">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
            </div>
            <div class="col-lg-3 text-center fly-in" style="animation-delay: 0.3s;">
                <img class="rounded-circle mb-3" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                <h2>Bot 3</h2>
                <p class="mb-4">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a class="btn btn-primary" href="#" role="button">View details »</a></p>
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
