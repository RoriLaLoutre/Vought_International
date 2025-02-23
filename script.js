document.addEventListener("DOMContentLoaded", function () {
    const formSelect = document.getElementById("form-select");
    const heroPowerForm = document.getElementById("hero-power-form");
    const heroMissionForm = document.getElementById("hero-mission-form");

    formSelect.addEventListener("change", function () {
        heroPowerForm.style.display = "none";
        heroMissionForm.style.display = "none";

        if (this.value === "hero-power") {
            heroPowerForm.style.display = "block";
        } else if (this.value === "hero-mission") {
            heroMissionForm.style.display = "block";
        }
    });

    // Fonction pour envoyer les requêtes API
    async function sendData(url, data, successMessage) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(response.ok ? successMessage : "Erreur : " + result.error);
        } catch (error) {
            alert("Erreur de connexion au serveur.");
        }
    }

    // Gérer l'envoi du formulaire "Pouvoir ↔ Héros"
    heroPowerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const heroId = document.getElementById("hero_id_power").value;
        const powerId = document.getElementById("power_id").value;

        sendData(
            "http://localhost:3000/api/v1/heroes/hero-power",
            { heroId, powerId },
            "Pouvoir ajouté au héros avec succès !"
        );
    });

    // Gérer l'envoi du formulaire "Mission ↔ Héros"
    heroMissionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const heroId = document.getElementById("hero_id_mission").value;
        const missionId = document.getElementById("mission_id").value;

        sendData(
            "http://localhost:3000/api/v1/heroes/hero-mission",
            { heroId, missionId },
            "Mission ajoutée au héros avec succès !"
        );
    });
});
