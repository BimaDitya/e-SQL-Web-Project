import * as RDD from "react-device-detect"

export default function Device(props) {
  return <div>{props.children(RDD)}</div>;
}