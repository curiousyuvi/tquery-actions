import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

type UpdateCharacterAPI = (character: Character) => Promise<Character>;
type UseUpdateCharacter = (
  onSuccess?: () => void,
) => UseMutationResult<Character, unknown, Character, unknown>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const updateCharacterAPI: UpdateCharacterAPI = async (character) => {
  const res = await request.put(API_ENDPOINT + `/${character.id}`).send(character);
  return res.body;
};

export const useUpdateCharacter: UseUpdateCharacter = (onSuccess) => {
  const mutation: UseMutationResult<Character, any, Character, any> = useMutation({
    mutationFn: updateCharacterAPI,
    onSuccess,
  });

  return mutation;
};
