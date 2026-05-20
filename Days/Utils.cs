namespace Days;

public static class Utils
{
    public const int MaxDays = 12;
    public const int MaxParts = 2;

    private static readonly string[] DayNames =
    [
        "one", "two", "three", "four", "five", "six",
        "seven", "eight", "nine", "ten", "eleven", "twelve"
    ];

    public static void LogError(string message)
    {
        var previousForeground = Console.ForegroundColor;
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(message);
        Console.ForegroundColor = previousForeground;
    }

    public static string GetInputPath(string fileName)
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);

        while (directory is not null)
        {
            var inputPath = Path.Combine(directory.FullName, "Inputs", fileName);
            if (File.Exists(inputPath))
            {
                return inputPath;
            }

            directory = directory.Parent;
        }

        return Path.Combine(AppContext.BaseDirectory, "Inputs", fileName);
    }
    public static string GetDayName(int dayNumber) => DayNames[dayNumber - 1];
}
