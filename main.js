let Result = document.getElementById("Result");
let Name = document.getElementById("name");
let Marke = document.getElementById("marke");
let Production = document.getElementById("D_Production");
let Type = document.querySelector("#select");
let Price = document.getElementById("prix");
let promotions = document.getElementsByName("promotion");
let Create_P = document.getElementById("Add_btn");
let tbody = document.querySelector("tbody");
let Article_Modal = document.getElementById("Pro_info");
let deletebtn = document.getElementById("delete_Pro")
let Name_Regex = /[a-zA-Z-\s\w\s]+$/gi;
let M_Regex = /[a-zA-Z-\s]+$/gi;
let mood = "create";
let temp;

let arr = [];
let Add_Pro = [];

if (localStorage.product != null) {
    Add_Pro = JSON.parse(localStorage.product);
}

class Newproduct {

    constructor(name, marke, production, type, price, promotion) {
        this.name = name;
        this.marke = marke;
        this.production = production;
        this.type = type;
        this.price = price;
        this.promotion = promotion;
    }

    Modal_Article() {
        const Mdl = document.createElement("div");
        Mdl.classList.add("Pro_info");
        Mdl.innerHTML = `
        <p> Name :            <span>${this.name}</span></p>
        <p> Marke :           <span>${this.marke}</span></p>
        <p> Production Date : <span>${this.production}</span></p>
        <p> Type :            <span>${this.type}</span></p>
        <p> Price :           <span>${this.price}</span></p>
        <p> Promotion :       <span>${this.promotion}</span></p>
        `;
        Article_Modal.appendChild(Mdl);
        Add_Pro.push(this);
        Add_Pro.sort((a, z) => a.name.localeCompare(z.name));
        localStorage.setItem("product", JSON.stringify(Add_Pro));
    }
}
function ShowDataBase() {
    let table = "";
    if (Add_Pro.length == 0) {
        table = ""
    } else {
        for (let i = 0; i < Add_Pro.length; i++) {
            table += `
            <tr>
            <td>${Add_Pro[i].name
                }</td>
            <td>${Add_Pro[i].marke
                }</td>
            <td>${Add_Pro[i].production
                }</td>
            <td>${Add_Pro[i].type
                }</td>
            <td>${Add_Pro[i].price
                }</td>
            <td>${Add_Pro[i].promotion
                }</td>
            <td><button onclick="EditData(${i})" id="Edit">Edit</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `;
        }
    }
    tbody.innerHTML = table;
}




Create_P.addEventListener("click", (e) => {
    e.preventDefault();

    validte();

    // ===================== Create_Product ================

    if (arr.length === 6 && mood === "create") { // this part is for creating a new product
        console.log(arr);
        const New_Pro = new Newproduct(
            Name.value,
            Marke.value,
            Production.value,
            Type.value,
            Price.value, 
            document.querySelector('input[name="promotion"]:checked')?.value)
        New_Pro.Modal_Article();
        document.getElementById("Add_btn").innerHTML = "Add Product";
        mood = "create"
        Name.value = "";
        Marke.value = "";
        Production.value = "";
        Type.value = "";
        Price.value = "";
        document.getElementById("Promo_Y").checked = false;
        document.getElementById("Promo_N").checked = false;
        document.getElementById("Product_form").style.display = "none";
        document.getElementById("Output_form").style.display = "none";
        Result.innerHTML = "Your Product added successfuly";
        Result.style.color = "green";
        Result.style.backgroundColor = "white";
        arr = [];
        ShowDataBase();
        return New_Pro;
    } else if (arr.length === 6 &&  mood === "update") { // this part is for updating a existing product
        Add_Pro[temp].name = Name.value ;
        Add_Pro[temp].marke = Marke.value ;
        Add_Pro[temp].production = Production.value ;
        Add_Pro[temp].type = Type.value ;
        Add_Pro[temp].price = Price.value ;
        Add_Pro[temp].promotion =  document.querySelector('input[name="promotion"]:checked')?.value ;
        Add_Pro.sort((a, z) => a.name.localeCompare(z.name));
        localStorage.setItem("product", JSON.stringify(Add_Pro));
        document.getElementById("Add_btn").innerHTML = "Add Product";
        mood = "create"
        Name.value = "";
        Marke.value = "";
        Production.value = "";
        Type.value = "";
        Price.value = "";
        document.getElementById("Promo_Y").checked = false;
        document.getElementById("Promo_N").checked = false;
        Result.innerHTML = "Your Product Updated successfuly";
        Result.style.color = "green";
        Result.style.backgroundColor = "white";
        arr = [];
        ShowDataBase();
    } else {
        Result.innerHTML = "an error occurred";
        Result.style.color = "red";
        Result.style.backgroundColor = "white";
    }

})



function DeleteData(i) {
    document.getElementById("Product_form").style.display = "none"
    document.getElementById("modal").style.display = "block";
    document.getElementById("Output_form").style.display = "none";
    delete_Pro.setAttribute("onclick", `ConfirmDelete(${i})`);
}
function ConfirmDelete(i) {
    Add_Pro.splice(i, 1);
    localStorage.product = JSON.stringify(Add_Pro);
    document.getElementById("modal").style.display = "none";
    document.getElementById("Product_form").style.display = "block";
    document.getElementById("Output_form").style.display = "block";
    ShowDataBase();
}


function EditData(i) {

    Name.value = Add_Pro[i].name;
    Marke.value = Add_Pro[i].marke;
    Production.value = Add_Pro[i].production;
    Type.value = Add_Pro[i].type;
    Price.value = Add_Pro[i].price;
    promotions = Add_Pro[i].promotions;
    document.getElementById("Add_btn").innerHTML = "Update";
    mood = "update";
    temp = i;
    console.log(temp);
}



function validte() {

    // ======================================= Name_Validation ====================================

    if (Name.value === "") {
        document.getElementById("Name_ER").innerHTML = "required field";
    } else if (!(Name_Regex.test(Name.value))) {
        document.getElementById("Name_ER").innerHTML = "You can't use special characters";
    } else {
        document.getElementById("Name_ER").innerHTML = ""
        arr.push(true);
    }

    // ====================================== Marke validation ===============================

    if (Marke.value === "") {
        document.getElementById("Marke_ER").innerHTML = "required field";
    } else if (M_Regex.test(Name.value) === false) {
        document.getElementById("Marke_ER").innerHTML = "Only Letters Allowed";
    } else {
        document.getElementById("Marke_ER").innerHTML = ""
        arr.push(true);
    }

    // ================ Production_Validation ====================

    if (Production.value === "") {
        document.getElementById("Prduction_ER").innerHTML = "Required field";
    } else {
        document.getElementById("Prduction_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Type_Validation ====================

    if (Type.value === "") {
        document.getElementById("Type_ER").innerHTML = "Required field";
    } else {
        document.getElementById("Type_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Prix_Validation ====================

    if (Price.value === "") {
        document.getElementById("Prix_ER").innerHTML = "Required field";
    } else {
        document.getElementById("Prix_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Promotion_Validation ====================

    if (document.getElementById("Promo_Y").checked === false && document.getElementById("Promo_N").checked === false) {
        document.getElementById("Promotion_ER").innerHTML = "You must check yes or no";
    } else {
        document.getElementById("Promotion_ER").innerHTML = "";
        arr.push(true);
    }

}
function HideModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("Product_form").style.display = "block";
    document.getElementById("Output_form").style.display = "block";
}

function Cancel() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("Product_form").style.display = "block"
    document.getElementById("Output_form").style.display = "block";
}
ShowDataBase();