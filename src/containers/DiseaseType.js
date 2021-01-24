import React, {useState, useEffect} from "react";
import DiseaseTypeDataService from "../services/DiseaseTypeService";
import DiseaseTypeList from "../components/diseaseTypes/DiseaseTypeList";


const DiseaseType = () => {
    const [diseaseTypes, setDiseaseTypes] = useState([]);
    const [searchName, setSearchName] = useState("");
    useEffect(() => {
        retrieveDiseaseTypes();
    }, []);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveDiseaseTypes = () => {
        DiseaseTypeDataService.getAll()
            .then(response => {
                setDiseaseTypes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        DiseaseTypeDataService.findByName(searchName)
            .then((response) => {
                setDiseaseTypes(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <DiseaseTypeList
            diseaseTypes={diseaseTypes}
            searchName={searchName}
            onChangeSearchName={onChangeSearchName}
            findByName={findByName}
        />
    );
};

export default DiseaseType;
