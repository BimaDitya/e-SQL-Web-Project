// Kompetensi Dasar
export default function BasicCompetencies() {
  return (
    <>
      {/* KD 3.4 & 4.4 */}
      <div className="pb-2">
        <p className="font-head text-xl font-bold text-secondary-400">
          Kompetensi Dasar 3.4 & 4.4
        </p>
        <ul className="mx-5 list-disc text-justify font-body text-gray-500">
          <li>
            Memahami kelompok perintah yang termasuk dalam Data Definition
            Language, Data Manipulation Language, dan Data Control Language.
          </li>
          <li>
            Membuat kelompok perintah yang termasuk dalam Data Definition
            Language, Data Manipulation Language, dan Data Control Language.
          </li>
        </ul>
      </div>

      {/* KD 3.9 & 4.9 */}
      <div className="pb-2">
        <p className="font-head text-xl font-bold text-secondary-400">
          Kompetensi Dasar 3.9 & 4.9
        </p>
        <ul className="mx-5 list-disc text-justify font-body text-gray-500">
          <li>
            Memahami penerapan Fungsi Agregasi di dalam Basis Data dengan
            menggunakan perintah Structured Query Language.
          </li>
          <li>
            Membuat perintah Structured Query Language dengan menggunakan Fungsi
            Agregasi di dalam Basis Data.
          </li>
        </ul>
      </div>

      {/* KD 3.14 & 4.14 */}
      <div className="pb-2">
        <p className="font-head text-xl font-bold text-secondary-400">
          Kompetensi Dasar 3.14 & 4.14
        </p>
        <ul className="mx-5 list-disc text-justify font-body text-gray-500">
          <li>
            Memahami penerapan Multitable dengan perintah Structured Query
            Language untuk mengakses tabel dari Basis Data.
          </li>
          <li>
            Membuat perintah Structured Query Language dengan menerapkan
            Multitable untuk mengakses tabel dari Basis Data.
          </li>
        </ul>
      </div>
    </>
  );
}
