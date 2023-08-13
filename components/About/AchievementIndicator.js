// Kompetensi Dasar
export default function AchievementIndicator() {
  return (
    <div className="h-full overflow-y-scroll">
      {/* KD 3.4 & 4.4 */}
      <div className="pb-2">
        <p className="font-head text-xl font-bold text-secondary-400">
          Indikator Pencapaian 3.4.1 - 3.4.11 & 4.4.1
        </p>
        <ul className="mx-5 list-disc text-justify font-body text-gray-600">
          <li>
            Mengidentifikasi kelompok perintah Data Definition Language, Data
            Manipulation Language, dan Data Control Language di Basis Data.
          </li>
          <li>
            Mengaplikasikan perintah CREATE, ALTER, RENAME, DROP, SELECT,
            INSERT, UPDATE, DELETE, GRANT, REVOKE di Basis Data.
          </li>
          <li>
            Menerapkan kelompok perintah Data Definition Language, Data
            Manipulation Language, dan Data Control Language di Basis Data.
          </li>
        </ul>
      </div>

      {/* KD 3.9 & 4.9 */}
      <div className="pb-2">
        <p className="font-head text-xl font-bold text-secondary-400">
          Indikator Pencapaian 3.9.1 - 3.9.6 & 4.9.1 - 4.9.5
        </p>
        <ul className="mx-5 list-disc text-justify font-body text-gray-600">
          <li>
            Dapat Menjelaskan perintah dengan Fungsi Agregasi yang ada di dalam
            Basis Data menggunakan Structured Query Language.
          </li>
          <li>
            Dapat Menjelaskan Fungsi COUNT(), SUM(), AVG(), MIN(), MAX() di
            dalam Basis Data dengan benar.
          </li>
          <li>
            Menjalankan perintah Structured Query Language dengan menggunakan
            Fungsi Agregasi COUNT(), SUM(), AVG(), MIN(), MAX() di dalam Basis
            Data.
          </li>
        </ul>
      </div>

      {/* KD 3.14 & 4.14 */}
      <div className="pb-2">
        <p className="font-head text-xl font-bold text-secondary-400">
          Indikator Pencapaian 3.14.1 - 3.4.3 & 4.14.1 - 4.14.3
        </p>
        <ul className="mx-5 list-disc text-justify font-body text-gray-600">
          <li>
            Dapat menjelaskan perintah INNER JOIN, RIGHT JOIN, LEFT JOIN di
            dalam Basis Data dengan benar.
          </li>
          <li>
            Dapat menerapkan perintah INNER JOIN, RIGHT JOIN, LEFT JOIN dalam
            penggabungan data dari beberapa tabel dengan benar.
          </li>
        </ul>
      </div>
    </div>
  );
}
