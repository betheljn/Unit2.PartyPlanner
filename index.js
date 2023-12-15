const party = document.getElementById("party");
const submit = document.getElementById("submit");
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events`;

const state = {
    parties: [],
  };

const partyList = document.querySelector("#parties");

// Get Artist from API
async function getParties() {
    try {
      const response = await fetch (API_URL);
      const json = await response.json();
      state.parties = json.data;
    } catch (error) {
      console.error(error);
    }
  }

// Render artists from state
function renderParties() {
    if (!state.parties.length) {
      partyList.innerHTML = "<li>No parties.</li>";
      return
    }
  
    const partyCards = state.parties.map((element) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <h2>${element.name}</h2>
      <p>Description: ${element.description}</p>
      <p>Date: ${element.date}</p>
      <p>Location: ${element.location}</p>
      <button id="${element._id}" class="btn btn-danger">Delete</button>
    `;
      return li;
    });
      partyList.replaceChildren(...partyCards);
  }

    const deleteParty = async (e) => {
        const party_id = e.target.id;
        try {
          const response = await fetch(
            `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events/${party_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          const result = await response.json();
          console.log("Success:", result);
      
          // Rerender the updated list after successful deletion
          await getParties();
          renderParties();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
  
  const render1 = async () => {
    try {
      const response = await fetch(API_URL,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
    partyList.innerHTML = '';
  
      const result = await response.json();
      result.data.forEach((element) => {
        const li = document.createElement("li");
        li.style.margin = "5%";
  
        const pName = document.createElement("p");
        pName.innerHTML = `Name: ${element.name}`;
        li.appendChild(pName);
  
        const pDescription = document.createElement("p");
        pDescription.innerHTML = `Description: ${element.description}`;
        li.appendChild(pDescription);
  
        const pDate = document.createElement("p");
        pDate.innerHTML = `Date: ${element.date}`;
        li.appendChild(pDate);

        const pLocation = document.createElement("p");
        pLocation.innerHTML = `Location: ${element.location}`;
        li.appendChild(pLocation);
  
        const button = document.createElement("button");
        button.innerHTML = "Delete";
        button.id = element._id;
        button.addEventListener("click", deleteParty);
        li.appendChild(button);
  
        partyList.appendChild(li);
      });
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  render();
  
  const addParty = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
  
    const obj = {
      name,
      description,
      date,
      location,
    };
  
    try {
      const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  submit.addEventListener("click", addParty);

//Sync state with the API and rerender
 async function render() {
   await getParties();
   renderParties();
 }
 render1();