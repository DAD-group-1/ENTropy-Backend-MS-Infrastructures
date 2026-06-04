import dataSource from './data-source';
import { Campus } from '../core/campuses/entities/campus.entity';
import { Building } from '../core/buildings/entities/building.entity';
import { RoomType } from '../core/rooms/entities/room-type.entity';
import { Room } from '../core/rooms/entities/room.entity';
import { CampusStatus, RoomStatus } from '@dad-group-1/backend-common';

// Helper to build a room entry with all required fields
function makeRoom(
  name: string,
  campus: Campus,
  building: Building,
  floor: number,
  capacity: number,
  roomType: RoomType,
  equipement: string,
  status: RoomStatus,
): Partial<Room> {
  return {
    name,
    campus_id: campus.id,
    campus,
    building_id: building.id,
    building,
    floor,
    capacity,
    room_type_id: roomType.id,
    roomType,
    equipement,
    status,
  };
}

async function seed() {
  await dataSource.initialize();
  console.log('✅ Database connected');

  const campusRepo = dataSource.getRepository(Campus);
  const buildingRepo = dataSource.getRepository(Building);
  const roomTypeRepo = dataSource.getRepository(RoomType);
  const roomRepo = dataSource.getRepository(Room);

  // ── Clear existing data ──────────────
  await dataSource.query(
    'TRUNCATE TABLE room, room_type, building, campus RESTART IDENTITY CASCADE',
  );
  console.log('🗑️  Cleared existing data');

  // ── Campuses ───────────────────────────────────────────────────────────────
  const campusesData = [
    {
      name: 'Campus Paris La Défense',
      address: '10 Esplanade de la Défense',
      city: 'Puteaux',
      zip_code: '92800',
      region: 'Île-de-France',
      director: 'Sophie Martin',
      phone: '+33 1 47 00 10 00',
      email: 'paris.ladefense@entropy.edu',
      student_capacity: 4500,
      opening_date: new Date('2005-09-01'),
      status: CampusStatus.ACTIVE,
    },
    {
      name: 'Campus Lyon Part-Dieu',
      address: '5 Rue de la Part-Dieu',
      city: 'Lyon',
      zip_code: '69003',
      region: 'Auvergne-Rhône-Alpes',
      director: 'Thomas Dupont',
      phone: '+33 4 72 00 20 00',
      email: 'lyon.partdieu@entropy.edu',
      student_capacity: 3000,
      opening_date: new Date('2010-09-01'),
      status: CampusStatus.ACTIVE,
    },
    {
      name: 'Campus Bordeaux Mériadeck',
      address: "15 Rue du Château d'Eau",
      city: 'Bordeaux',
      zip_code: '33000',
      region: 'Nouvelle-Aquitaine',
      director: 'Claire Leblanc',
      phone: '+33 5 56 00 30 00',
      email: 'bordeaux.meriadeck@entropy.edu',
      student_capacity: 2000,
      opening_date: new Date('2015-09-01'),
      status: CampusStatus.INACTIVE,
    },
  ];

  const campuses = await campusRepo.save(campusesData);
  console.log(`🏫 Created ${campuses.length} campuses`);

  const [paris, lyon, bordeaux] = campuses;

  // ── Buildings ──────────────────────────────────────────────────────────────
  const buildingsData = [
    // Paris
    {
      campus_id: paris.id,
      campus: paris,
      name: 'Bâtiment A – Informatique',
    },
    {
      campus_id: paris.id,
      campus: paris,
      name: 'Bâtiment B – Sciences',
    },
    {
      campus_id: paris.id,
      campus: paris,
      name: 'Bâtiment C – Administration',
    },
    // Lyon
    {
      campus_id: lyon.id,
      campus: lyon,
      name: 'Tour Nord',
    },
    {
      campus_id: lyon.id,
      campus: lyon,
      name: 'Tour Sud',
    },
    // Bordeaux
    {
      campus_id: bordeaux.id,
      campus: bordeaux,
      name: 'Pavillon Principal',
    },
    {
      campus_id: bordeaux.id,
      campus: bordeaux,
      name: 'Annexe Est',
    },
  ];

  const buildings = await buildingRepo.save(buildingsData);
  console.log(`🏢 Created ${buildings.length} buildings`);

  const [bldPA, bldPB, bldPC, bldLN, bldLS, bldBP, bldBA] = buildings;

  // ── Room Types (per campus) ────────────────────────────────────────────────
  const roomTypeNames = [
    'Amphithéâtre',
    'Salle de cours',
    'Salle informatique',
    'Laboratoire',
    'Salle de réunion',
  ];

  const roomTypesData = campuses.flatMap((campus) =>
    roomTypeNames.map((name) => ({ campus_id: campus.id, campus, name })),
  );

  const roomTypes = await roomTypeRepo.save(roomTypesData);
  console.log(`📋 Created ${roomTypes.length} room types`);

  const rt = (campus: Campus, name: string): RoomType =>
    roomTypes.find((r) => r.campus_id === campus.id && r.name === name)!;

  // ── Rooms ──────────────────────────────────────────────────────────────────
  const roomsData: Partial<Room>[] = [
    // ── Paris – Bâtiment A (Informatique) ──────────────────────────────────
    makeRoom(
      'A-001 Amphi Darwin',
      paris,
      bldPA,
      0,
      250,
      rt(paris, 'Amphithéâtre'),
      'Vidéoprojecteur, Micro, Estrade',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'A-101 Salle Java',
      paris,
      bldPA,
      1,
      30,
      rt(paris, 'Salle informatique'),
      'PC, Vidéoprojecteur, Tableau blanc',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'A-102 Salle Python',
      paris,
      bldPA,
      1,
      30,
      rt(paris, 'Salle informatique'),
      'PC, Vidéoprojecteur, Tableau blanc',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'A-201 Salle Réseau',
      paris,
      bldPA,
      2,
      20,
      rt(paris, 'Laboratoire'),
      'Baies réseau, Switches, PC',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'A-202 Labo Cybersécurité',
      paris,
      bldPA,
      2,
      16,
      rt(paris, 'Laboratoire'),
      'PC haute sécurité, Firewall',
      RoomStatus.UNAVAILABLE,
    ),

    // ── Paris – Bâtiment B (Sciences) ──────────────────────────────────────
    makeRoom(
      'B-001 Amphi Newton',
      paris,
      bldPB,
      0,
      300,
      rt(paris, 'Amphithéâtre'),
      'Vidéoprojecteur HD, Micro sans fil, Estrade',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'B-101 Salle Maths',
      paris,
      bldPB,
      1,
      40,
      rt(paris, 'Salle de cours'),
      'Tableau noir, Vidéoprojecteur',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'B-102 Salle Physique',
      paris,
      bldPB,
      1,
      40,
      rt(paris, 'Salle de cours'),
      'Tableau blanc, Vidéoprojecteur',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'B-201 Labo Chimie',
      paris,
      bldPB,
      2,
      24,
      rt(paris, 'Laboratoire'),
      'Paillasses, Hottes, Matériel chimique',
      RoomStatus.AVAILABLE,
    ),

    // ── Paris – Bâtiment C (Administration) ────────────────────────────────
    makeRoom(
      'C-001 Salle Conseil',
      paris,
      bldPC,
      0,
      20,
      rt(paris, 'Salle de réunion'),
      'Écran tactile, Visioconférence',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'C-101 Salle Projet Alpha',
      paris,
      bldPC,
      1,
      12,
      rt(paris, 'Salle de réunion'),
      'Tableau blanc, TV',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'C-102 Salle Projet Beta',
      paris,
      bldPC,
      1,
      12,
      rt(paris, 'Salle de réunion'),
      'Tableau blanc, TV',
      RoomStatus.UNAVAILABLE,
    ),

    // ── Lyon – Tour Nord ────────────────────────────────────────────────────
    makeRoom(
      'TN-001 Amphi Lumière',
      lyon,
      bldLN,
      0,
      200,
      rt(lyon, 'Amphithéâtre'),
      'Vidéoprojecteur, Micro, Estrade',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'TN-101 Salle Web',
      lyon,
      bldLN,
      1,
      25,
      rt(lyon, 'Salle informatique'),
      'PC, Vidéoprojecteur',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'TN-102 Salle Mobile',
      lyon,
      bldLN,
      1,
      25,
      rt(lyon, 'Salle informatique'),
      'PC, Vidéoprojecteur',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'TN-201 Salle IA',
      lyon,
      bldLN,
      2,
      20,
      rt(lyon, 'Laboratoire'),
      'GPU Workstations, Serveur IA',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'TN-301 Salle Cours A',
      lyon,
      bldLN,
      3,
      35,
      rt(lyon, 'Salle de cours'),
      'Tableau blanc, Vidéoprojecteur',
      RoomStatus.UNAVAILABLE,
    ),

    // ── Lyon – Tour Sud ─────────────────────────────────────────────────────
    makeRoom(
      'TS-001 Salle Séminaire',
      lyon,
      bldLS,
      0,
      50,
      rt(lyon, 'Salle de cours'),
      'Vidéoprojecteur, Système son',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'TS-101 Réunion Direction',
      lyon,
      bldLS,
      1,
      10,
      rt(lyon, 'Salle de réunion'),
      'Visioconférence, Écran 65"',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'TS-201 Salle Cours B',
      lyon,
      bldLS,
      2,
      35,
      rt(lyon, 'Salle de cours'),
      'Tableau blanc, Vidéoprojecteur',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'TS-202 Salle Cours C',
      lyon,
      bldLS,
      2,
      35,
      rt(lyon, 'Salle de cours'),
      'Tableau blanc, Vidéoprojecteur',
      RoomStatus.AVAILABLE,
    ),

    // ── Bordeaux – Pavillon Principal ───────────────────────────────────────
    makeRoom(
      'PP-001 Amphi Montaigne',
      bordeaux,
      bldBP,
      0,
      180,
      rt(bordeaux, 'Amphithéâtre'),
      'Vidéoprojecteur, Micro, Estrade',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'PP-101 Salle Gestion',
      bordeaux,
      bldBP,
      1,
      30,
      rt(bordeaux, 'Salle de cours'),
      'Tableau blanc, Vidéoprojecteur',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'PP-102 Salle Finance',
      bordeaux,
      bldBP,
      1,
      30,
      rt(bordeaux, 'Salle de cours'),
      'Tableau blanc, Vidéoprojecteur',
      RoomStatus.UNAVAILABLE,
    ),
    makeRoom(
      'PP-201 Labo Comptabilité',
      bordeaux,
      bldBP,
      2,
      20,
      rt(bordeaux, 'Salle informatique'),
      'PC, Logiciels comptables',
      RoomStatus.UNAVAILABLE,
    ),

    // ── Bordeaux – Annexe Est ───────────────────────────────────────────────
    makeRoom(
      'AE-001 Salle Conférence',
      bordeaux,
      bldBA,
      0,
      60,
      rt(bordeaux, 'Salle de cours'),
      'Vidéoprojecteur, Système son',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'AE-101 Réunion Partenaires',
      bordeaux,
      bldBA,
      1,
      14,
      rt(bordeaux, 'Salle de réunion'),
      'Visioconférence, TV 55"',
      RoomStatus.AVAILABLE,
    ),
    makeRoom(
      'AE-201 Labo Innovation',
      bordeaux,
      bldBA,
      2,
      18,
      rt(bordeaux, 'Laboratoire'),
      'Imprimantes 3D, Électronique, Outils',
      RoomStatus.UNAVAILABLE,
    ),
  ];

  const rooms = await roomRepo.save(roomsData as Room[]);
  console.log(`🚪 Created ${rooms.length} rooms`);

  console.log('\n🎉 Seeding complete!');
  console.log(`   • ${campuses.length} campuses`);
  console.log(`   • ${buildings.length} buildings`);
  console.log(`   • ${roomTypes.length} room types`);
  console.log(`   • ${rooms.length} rooms`);

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
