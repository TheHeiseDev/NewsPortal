import { useState, useEffect } from "react";

export function getIPAddress(): Promise<string> {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      return data.ip;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCountryByIP(ipAddress: string) {
  return fetch(`https://ipapi.co/${ipAddress}/country/`)
    .then((response) => response.text())
    .catch((error) => {
      console.log(error);
    });
}

export function useIPInfo() {
  const [ipAddress, setIPAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json" )
      .then((response) => response.json())
      .then((data) => {
        setIPAddress(data.ip);
        return fetch(`https://ipapi.co/${data.ip}/country/`);
      })
      .then((response) => response.text())
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { ipAddress, country };
}
