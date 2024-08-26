export type IScan = {
  scan_id: string;
  patient_id: string;
  patient_name: string;
  gender: string;
  prediction: string;
  image_base64: string;
}

export type IScanResult = {
  scan_id: string;
  patient_name: string;
  date: string;
  result: string;
  p_class: string;
}