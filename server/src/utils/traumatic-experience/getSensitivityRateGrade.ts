const getSensitivityRateGrade = (sensitivityRate: number) => {
  let sensitivityRateGrade: number;
  if (sensitivityRate >= 0 && sensitivityRate <= 17) {
    sensitivityRateGrade = 1;
  } else if (sensitivityRate >= 18 && sensitivityRate <= 35) {
    sensitivityRateGrade = 2;
  } else if (sensitivityRate >= 36 && sensitivityRate <= 53) {
    sensitivityRateGrade = 3;
  } else if (sensitivityRate >= 54 && sensitivityRate <= 71) {
    sensitivityRateGrade = 4;
  } else if (sensitivityRate >= 72 && sensitivityRate <= 89) {
    sensitivityRateGrade = 5;
  } else {
    sensitivityRateGrade = 6;
  }
  return sensitivityRateGrade;
};

export default getSensitivityRateGrade;
