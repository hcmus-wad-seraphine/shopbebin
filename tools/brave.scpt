tell application "Brave Browser"
    repeat with theWindow in windows
        repeat with theTab in tabs of theWindow
            if URL of theTab contains "localhost:3120" then
                tell theTab to reload
            end if
        end repeat
    end repeat
end tell