document.addEventListener("DOMContentLoaded", function() {
    const unitTypeSelect = document.getElementById("unit-type");
    const inputUnitSelect = document.getElementById("input-unit");
    const outputUnitSelect = document.getElementById("output-unit");

    const units = {
        mass: ["kg", "lb"],
        length: ["m", "ft"],
        area: ["m²", "ft²"],
        volume: ["l", "gal"],
        pressure: ["Pa", "psi"],
        temperature: ["C", "F"]
    };

    unitTypeSelect.addEventListener("change", function() {
        const unitType = unitTypeSelect.value;
        populateUnitOptions(unitType);
    });

    function populateUnitOptions(unitType) {
        const unitOptions = units[unitType];
        inputUnitSelect.innerHTML = "";
        outputUnitSelect.innerHTML = "";

        unitOptions.forEach(unit => {
            const option1 = document.createElement("option");
            option1.value = unit;
            option1.text = unit;
            inputUnitSelect.add(option1);

            const option2 = document.createElement("option");
            option2.value = unit;
            option2.text = unit;
            outputUnitSelect.add(option2);
        });
    }

    populateUnitOptions("mass");

    window.convert = function() {
        const unitType = unitTypeSelect.value;
        const inputValue = parseFloat(document.getElementById("input-value").value);
        const inputUnit = inputUnitSelect.value;
        const outputUnit = outputUnitSelect.value;
        let result;

        if (isNaN(inputValue)) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        switch(unitType) {
            case "mass":
                result = convertMass(inputValue, inputUnit, outputUnit);
                break;
            case "length":
                result = convertLength(inputValue, inputUnit, outputUnit);
                break;
            case "area":
                result = convertArea(inputValue, inputUnit, outputUnit);
                break;
            case "volume":
                result = convertVolume(inputValue, inputUnit, outputUnit);
                break;
            case "pressure":
                result = convertPressure(inputValue, inputUnit, outputUnit);
                break;
            case "temperature":
                result = convertTemperature(inputValue, inputUnit, outputUnit);
                break;
        }

        document.getElementById("result").innerText = `Resultado: ${result} ${outputUnit}`;
    };

    function convertMass(value, from, to) {
        const conversionRates = {
            "kg": 1,
            "lb": 2.20462
        };
        return (value / conversionRates[from] * conversionRates[to]).toFixed(2);
    }

    function convertLength(value, from, to) {
        const conversionRates = {
            "m": 1,
            "ft": 3.28084
        };
        return (value / conversionRates[from] * conversionRates[to]).toFixed(2);
    }

    function convertArea(value, from, to) {
        const conversionRates = {
            "m²": 1,
            "ft²": 10.7639
        };
        return (value / conversionRates[from] * conversionRates[to]).toFixed(2);
    }

    function convertVolume(value, from, to) {
        const conversionRates = {
            "l": 1,
            "gal": 0.264172
        };
        return (value / conversionRates[from] * conversionRates[to]).toFixed(2);
    }

    function convertPressure(value, from, to) {
        const conversionRates = {
            "Pa": 1,
            "psi": 0.000145038
        };
        return (value / conversionRates[from] * conversionRates[to]).toFixed(2);
    }

    function convertTemperature(value, from, to) {
        if (from === "C" && to === "F") {
            return (value * 9/5 + 32).toFixed(2);
        } else if (from === "F" && to === "C") {
            return ((value - 32) * 5/9).toFixed(2);
        } else {
            return value.toFixed(2);
        }
    }
});
