import React, {useState, useEffect} from "react";
import DiseaseDataService from "../services/DiseaseService";
import DiseaseList from "../components/diseases/DiseaseList";


const Disease = () => {
    const [diseases, setDiseases] = useState([]);
    const [searchName, setSearchName] = useState("");
    useEffect(() => {
        retrieveDiseases();
    }, []);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveDiseases = () => {
        DiseaseDataService.getAll()
            .then(response => {
                setDiseases(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        DiseaseDataService.findByName(searchName)
            .then((response) => {
                setDiseases(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <DiseaseList
            diseases={diseases}
            searchName={searchName}
            onChangeSearchName={onChangeSearchName}
            findByName={findByName}
        />
    );
};

export default Disease;
