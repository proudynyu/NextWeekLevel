const statesElem: Element = document.querySelector('select[name=state]');
const cityElem: Element = document.querySelector('select[name=city]');
const hideState: Element = document.querySelector('input[name=state-hidden]');
const hideCity: Element = document.querySelector('input[name=city-hidden]');

// apiRequest('city', null);

// statesElement.addEventListener('change', (e) => {
//     const eventValue = e.target;
//     hiddenState.value = e.target.options[e.target.selectedIndex].text;
    
//     cityElement.innerHTML = "";
//     cityElement.disabled = true;

//     apiRequest('city');
//     cityElement.disabled = false;
// });

interface cityObj {
    id: string,
    nome: string,
    microrregiao: {
        id: number,
        nome: string,
        mesorregiao: {
            id: number,
            nome: string,
            UF: stateObj,
        }
    }
};

interface stateObj {
    id: number,
    sigla: string,
    nome: string,
    regiao: {
        id: number,
        sigle: string,
        nome: string,
    }
};

async function apiRequest(type: string = 'uf', eventValue: (number | null) = null) {
    const API_REQUEST = async (url: string) => {
        const data: Response = await fetch(url);
        if (type === 'city') {
            const json: Array<cityObj> = await data.json();
            return json;
        }
        const json: Array<stateObj> = await data.json();
        return json;
    }
    try {
        if (type === 'city') {
            const url: string = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${eventValue}/municipios`;
            const master: Element = cityElem;
            const response = await API_REQUEST(url); 
            response.forEach( city => {
                createOption(master, city.id, city.nome)
            });
        } else {
            const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
            const master = statesElem;
            const response = await API_REQUEST(url);
            response.forEach( state => {
                createOption(master, state.id, state.sigla)
            });
        }
        return
    } catch (err) {
        console.log(err);
        return
    }
}

function createOption(masterElem: Element, value: string, inText: string) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.innerText = inText;
    masterElem.append(opt);
}
