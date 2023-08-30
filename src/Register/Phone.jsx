import React, { useState } from "react";

export default function Phone() {
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form>
        <label htmlFor="phoneNumber">Mobile No:</label>
        <input
          type="tel"
          value={phone}
          placeholder="+91-XXXXX-XXXXX"
          id="phone"
          pattern="[0-9]{5}-[0-9]{5}"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      </form>
    </div>
  );
}
