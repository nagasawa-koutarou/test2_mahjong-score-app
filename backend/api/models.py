from django.db import models
from django.contrib.auth.models import User


class Player(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='players')
    name = models.CharField(max_length=20)

    class Meta:
        unique_together = ('owner', 'name')

    def __str__(self):
        return f"{self.name}（{self.owner.username}）"


class PlayerStats(models.Model):
    STYLE_CHOICES = (
        (3, '三人麻雀'),
        (4, '四人麻雀'),
    )

    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='stats')
    style = models.PositiveSmallIntegerField(choices=STYLE_CHOICES)

    total_games = models.IntegerField(default=0)
    rank_1 = models.IntegerField(default=0)
    rank_2 = models.IntegerField(default=0)
    rank_3 = models.IntegerField(default=0)
    rank_4 = models.IntegerField(default=0)
    average_rank = models.FloatField(null=True, blank=True)
    average_score = models.FloatField(null=True, blank=True)
    average_revenue = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ('player', 'style')

    def __str__(self):
        return f"{self.player.name} - {self.get_style_display()}"


class Game(models.Model):
    STYLE_CHOICES = (
        (3, '三人麻雀'),
        (4, '四人麻雀'),
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='games')
    date_played = models.DateTimeField(auto_now_add=True)
    style = models.PositiveSmallIntegerField(choices=STYLE_CHOICES)
    notes = models.TextField(blank=True)
    score_unit = models.IntegerField(default=100)
    chip_unit = models.IntegerField(default=500)

    def __str__(self):
        return f"{self.owner.username}の対局（{self.get_style_display()}）"


class ScoreEntry(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='scores')
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    score = models.IntegerField()
    chip = models.IntegerField()
    revenue = models.IntegerField(blank=True, null=True)
    rank = models.PositiveSmallIntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.revenue = (
            self.score * self.game.score_unit +
            self.chip * self.game.chip_unit
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.player.name} - {self.score}点, {self.chip}枚, {self.rank}位"

