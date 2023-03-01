import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

type EditCharacterAPI = (character: Character) => Promise<Character>;
type UseEditCharacter = (
  onSuccess: () => void,
) => UseMutationResult<Character, unknown, Character, unknown>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const editCharacterAPI: EditCharacterAPI = async (characeter) => {
  const res = await request.put(API_ENDPOINT + `/${characeter.id}`).send(characeter);
  return res.body;
};

export const useEditCharacter: UseEditCharacter = (onSuccess) => {
  const mutation: UseMutationResult<Character, any, Character, any> = useMutation({
    mutationFn: editCharacterAPI,
    onSuccess,
  });

  return mutation;
};
