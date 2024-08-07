import React, { useEffect, useState } from "react";

const RequirementFields = ({
  name,
  label,
  setValue,
  getValues,
  register,
  errors,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const addRequirements = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
    }
  };
  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const removeRequiremnets = (index) => {
    const copy = [...requirementList];
    copy.splice(index, 1);
    setRequirementList(copy);
  };
  return (
    <div className="flex flex-col space-y-2">
      <div>
        <label className="text-sm text-richblack-5">{label}</label>
        <div className="flex flex-col items-start space-y-2"></div>
        <input
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          onClick={addRequirements}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 &&
        requirementList.map((requirement, index) => (
          <ul className="mt-2 list-inside list-disc">
            <li key={index} className="flex items-center text-richblack-5">
              {requirement}
              <button
                onClick={() => removeRequiremnets(index)}
                className="ml-2 text-xs text-pure-greys-300 "
              >
                Clear
              </button>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default RequirementFields;
