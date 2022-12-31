class UserEntity {
  id: string;
  login: string;
  email_rescue: string;
  profile_img: string;
  phot_album: string;
  created_at: Date;
  updated_at: Date | null;
}

export { UserEntity };
