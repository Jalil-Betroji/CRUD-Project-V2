let Result = document.getElementById("Result");
let Name = document.getElementById("name");
let Marke = document.getElementById("marke");
let Production = document.getElementById("D_Production");
let Type = document.querySelector("#select");
let Price = document.getElementById("prix");
let promotions = document.getElementsByName("promotion");
let Create_P = document.getElementById("Add_btn");
let tbody = document.querySelector("tbody");
let modalBody = document.querySelector("#Art_Section");
let Article_Modal = document.getElementById("Pro_info");
let deletebtn = document.getElementById("delete_Pro");
let Name_Regex = /[a-zA-Z-\s\w\s]+$/gi;
let M_Regex = /[a-zA-Z-\s]+$/gi;
let mood = "create";
let temp;

let arr = []; // Validation array we push true on it while the input value is correct

let Add_Pro = []; // We us this array to push our object to it and save it on our local storage

if (localStorage.product != null) {
  // condition to keep our data in the arra if it already exist in local storage after refresh
  Add_Pro = JSON.parse(localStorage.product);
}

// =======================  The OOP class and we use it to fulfill our object

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
    return `
        <p> Name :            <span>${this.name}</span></p>
        <p> Marke :           <span>${this.marke}</span></p>
        <p> Production Date : <span>${this.production}</span></p>
        <p> Type :            <span>${this.type}</span></p>
        <p> Price :           <span>${this.price}</span></p>
        <p> Promotion :       <span>${this.promotion}</span></p>
        `;
    // Add_Pro.push(this);
    // Add_Pro.sort((a, z) => a.name.localeCompare(z.name));
    // localStorage.setItem("product", JSON.stringify(Add_Pro));
  }
}

// We use this function to show our data from localStorage to the Page Table

function ShowDataBase() {
  let table = "";
  if (Add_Pro.length == 0) {
    table = "";
  } else {
    for (let i = 0; i < Add_Pro.length; i++) {
      table += `
            <tr>
            <td>${Add_Pro[i].name}</td>
            <td>${Add_Pro[i].marke}</td>
            <td>${Add_Pro[i].production}</td>
            <td>${Add_Pro[i].type}</td>
            <td>${Add_Pro[i].price}</td>
            <td>${Add_Pro[i].promotion}</td>
            <td><button onclick="EditData(${i})" id="Edit">Edit</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `;
    }
  }
  tbody.innerHTML = table;
}

// This is our submit button and inside it we set the action that happen after we click on it

Create_P.addEventListener("click", (e) => {
  e.preventDefault();

  validte(); // we called the validation function

  // ===================== Create_Product ================

  if (arr.length === 6 && mood === "create") {
    // this part is for creating a new product
    console.log(arr);
    const New_Pro = new Newproduct(
      Name.value,
      Marke.value,
      Production.value,
      Type.value,
      Price.value,
      document.querySelector('input[name="promotion"]:checked')?.value
    );
    Add_Pro.push(New_Pro);
    Add_Pro.sort((a, z) => a.name.localeCompare(z.name));
    localStorage.setItem("product", JSON.stringify(Add_Pro));
    Article_Modal.innerHTML = New_Pro.Modal_Article();
    document.getElementById("Add_btn").innerHTML = "Add Product";
    mood = "create";
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
  } else if (arr.length === 6 && mood === "update") {
    // this part is for updating an existing product
    Add_Pro[temp].name = Name.value;
    Add_Pro[temp].marke = Marke.value;
    Add_Pro[temp].production = Production.value;
    Add_Pro[temp].type = Type.value;
    Add_Pro[temp].price = Price.value;
    Add_Pro[temp].promotion = document.querySelector(
      'input[name="promotion"]:checked'
    )?.value;
    Add_Pro.sort((a, z) => a.name.localeCompare(z.name));
    localStorage.setItem("product", JSON.stringify(Add_Pro));
    document.getElementById("Add_btn").innerHTML = "Add Product";
    mood = "create";
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
    //this part will apply if we have a wrong value from the user
    Result.innerHTML = "an error occurred";
    Result.style.color = "red";
    Result.style.backgroundColor = "white";
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    Article_Modal.style.display = "none";
    Product_form.style.display = "block";
    document.getElementById("Output_form").style.display = "block";
  }
});

function DeleteData(i) {
  document.getElementById("Product_form").style.display = "none";
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
  promotions = Add_Pro[i].promotion;
  document.getElementById("Add_btn").innerHTML = "Update";
  mood = "update";
  temp = i;
}

function validte() {
  // ======================================= Name_Validation ====================================

  if (Name.value === "") {
    document.getElementById("Name_ER").innerHTML = "required field";
  } else if (!Name_Regex.test(Name.value)) {
    document.getElementById("Name_ER").innerHTML =
      "You can't use special characters";
  } else {
    document.getElementById("Name_ER").innerHTML = "";
    arr.push(true);
  }

  // ====================================== Marke validation ===============================

  if (Marke.value === "") {
    document.getElementById("Marke_ER").innerHTML = "required field";
  } else if (M_Regex.test(Name.value) === false) {
    document.getElementById("Marke_ER").innerHTML = "Only Letters Allowed";
  } else {
    document.getElementById("Marke_ER").innerHTML = "";
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

  if (
    document.getElementById("Promo_Y").checked === false &&
    document.getElementById("Promo_N").checked === false
  ) {
    document.getElementById("Promotion_ER").innerHTML =
      "You must check yes or no";
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
  document.getElementById("Product_form").style.display = "block";
  document.getElementById("Output_form").style.display = "block";
}
ShowDataBase();
modalBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal_body")) {
    modalBody.style.display = "none";
    document.getElementById("Product_form").style.display = "block";
    document.getElementById("Output_form").style.display = "block";
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && modalAdd.style.display == "flex") {
    modalBody.style.display = "none";
    document.getElementById("Product_form").style.display = "block";
    document.getElementById("Output_form").style.display = "block";
  }
});
