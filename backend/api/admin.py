from django.contrib import admin
from .models import Player, PlayerStats, Game, ScoreEntry

admin.site.register(Player)
admin.site.register(PlayerStats)
admin.site.register(Game)
admin.site.register(ScoreEntry)
