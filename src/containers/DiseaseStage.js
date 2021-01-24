import React, {useState, useEffect} from "react";
import DiseaseStageDataService from "../services/DiseaseStageService";
import DiseaseStageList from "../components/diseaseStages/DiseaseStageList";


const DiseaseStage = () => {
    const [diseaseStages, setDiseaseStages] = useState([]);
    const [searchName, setSearchName] = useState("");
    useEffect(() => {
        retrieveDiseaseStages();
    }, []);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveDiseaseStages = () => {
        DiseaseStageDataService.getAll()
            .then(response => {
                setDiseaseStages(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        DiseaseStageDataService.findByName(searchName)
            .then((response) => {
                setDiseaseStages(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <DiseaseStageList
            diseaseStages={diseaseStages}
            searchName={searchName}
            onChangeSearchName={onChangeSearchName}
            findByName={findByName}
        />
    );
};

export default DiseaseStage;
