$(function () {
    loadProduct();
    $("#product").on("click", ".btn-danger", DeleteHandle)
    $("#addbtn").click(addProduct());
});

function addProduct() {
    var title = $("#title").val();
    var title = $("#description").val();
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/products",
        method: "POST",
        data: { title, description },
        success: function (response) {
            console.log(response);
            loadProduct();
        }
    });
}

function DeleteHandle() {
    var id = $(this).attr('data-id');
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/products" + id,
        type: "DELETE",
        success: function () {
        }
    });
}
function loadProduct() {
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/products",
        method: 'GET',
        error: function (response) {
            var product = $("#product");
            product.HTML("An error has occurred");
        },
        success: function (response) {
            console.log(response);
            var product = $("#product");
            product.empty();
            for (var i = 0; i < response.length; i++) {
                var pro = response[i];
                product.append(
                    `<div class="product"><h3>${pro.name}</h3><p><button class="btn btn-danger sm btn-property">Delete</button>${pro.description}</p></div>`
                    // `<div class="product"><h3>${pro.name}</h3><p><button class="btn btn-danger sm btn-property">Delete</button><button class="btn btn-warning sm btn-property">Edit</button>${pro.description}</p></div>`
                );
            }
        }
    });
}

