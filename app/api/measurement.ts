type MeasurementBodyType = {
  child_id: string;
  date: string;
  weight?: number;
  weight_unit?: string;
  height?: string;
  height_unit?: string;
};

export async function addMeasurement(measurement: { childId: any; date: any; weight: number | null | undefined; weightUnit: string | undefined; height: string | null | undefined; heightUnit: string | undefined; }) {
  const body: MeasurementBodyType = {
    child_id: measurement.childId,
    date: measurement.date
  };
  
  if (measurement.weight !== null) {
    body.weight = measurement.weight;
    body.weight_unit = measurement.weightUnit;
  }

  if (measurement.height !== null) {
    body.height = measurement.height;
    body.height_unit = measurement.heightUnit;
  }
  
  const response = await fetch(`http://localhost:8080/measurement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
    return !response.body ? [] : response.json()
}

export async function getWeightData(childId: number) {
  const body = {
    childId,
  }
  const response = await fetch(`http://localhost:8080/weight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
    return !response.body ? [] : response.json()
}
