import { useState, useEffect } from "react";

export function useIPInfo() {
  const [ipAddress, setIPAddress] = useState<string>("0.0.0.0");
  const [country, setCountry] = useState<string>("Неизвестно");

  async function fetchData() {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      if (!ipResponse.ok) throw new Error(`Ошибка HTTP: ${ipResponse.status}`);

      const ipData = await ipResponse.json();
      if (!ipData.ip) throw new Error(`Ошибка HTTP`);

      setIPAddress(ipData.ip);

      const countryResponse = await fetch(`https://ipapi.co/${ipData.ip}/country_name/`);
      if (!countryResponse.ok) throw new Error(`Ошибка HTTP: ${countryResponse.status}`);

      const country = await countryResponse.text();

      if (!country || country === "Undefined")
        throw new Error(`Что-то не так с ip адресом!`);

      if (country) {
        setCountry(country);
      } else {
        console.warn("Ошибка при получении страны");
        throw new Error(`Ошибка запроса на получение данных о стране пользователя`);
      }
    } catch (error: any) {
      console.error(`Произошла ошибка: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { ipAddress, country };
}
