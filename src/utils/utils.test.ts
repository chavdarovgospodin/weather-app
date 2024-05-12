import { getDateValues } from './index';

import { degreesToDirection } from './index';

describe('degreesToDirection', () => {
  test('should return correct direction for given degree', () => {
    const mockDegree = 45;
    const result = degreesToDirection(mockDegree);

    expect(result).toEqual('NE');
  });
});

describe('getDateValues', () => {
  test('should return correct date values', () => {
    const mockDate = '2022/10/05 17:55';
    const result = getDateValues(mockDate);

    expect(result).toEqual({
      formattedDate: '10/05',
      formattedTime: '17:55 PM',
      weekDay: 'Wed',
    });
  });
});
