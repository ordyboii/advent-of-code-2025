namespace Days;

public sealed class DayOne
{
    private static Task<string[]> GetInputAsync() => File.ReadAllLinesAsync(Utils.GetInputPath("one.txt"));

    public static async Task PartOneAsync()
    {
        var input = await GetInputAsync();
        var dial = 50;
        var zeros = 0;

        foreach (var line in input)
        {
            if (string.IsNullOrWhiteSpace(line))
            {
                continue;
            }

            var move = line[0];
            var ticks = int.Parse(line[1..]);

            switch (move)
            {
                case 'R':
                    dial += ticks;
                    break;
                case 'L':
                    dial -= ticks;
                    break;
                default:
                    throw new InvalidOperationException($"Invalid move direction: {move}");
            }

            dial = ((dial % 100) + 100) % 100;

            if (dial == 0)
            {
                zeros++;
            }
        }

        Console.WriteLine($"Password: {zeros}");
    }

    public static async Task PartTwoAsync()
    {
        var input = await GetInputAsync();

        foreach (var line in input)
        {
            Console.WriteLine(line);
        }
    }
}
