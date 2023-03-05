import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { API_ENDPOINT } from '../../API';

type CreateCharacterAPI = (character: Character) => Promise<Character>;
type UseCreateCharacter = (
  onSuccess?: () => void,
) => UseMutationResult<Character, unknown, Character, unknown>;

const createCharacterAPI: CreateCharacterAPI = async (characeter) => {
  const res = await request.post(API_ENDPOINT).send(characeter);
  return res.body;
};

export const useCreateCharacter: UseCreateCharacter = (onSuccess) => {
  const mutation: UseMutationResult<Character, any, Character, any> = useMutation({
    mutationFn: createCharacterAPI,
    onSuccess,
  });

  return mutation;
};
